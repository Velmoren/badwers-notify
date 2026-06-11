import type { BadwersNotifyConfig, NotifyOptions, Position } from './types';
import type { Theme } from './theme';
import { config as mergeConfig, validatePosition, validateOptions } from './config';
import { createNotifyElement, setElementTheme } from './notify-element';
import { getStack, removeStack } from './stack';
import { showAnimation, closeAnimation, setupAutoClose, CSS } from './animate';
import { injectStyles } from './dom';
import { getSystemTheme, watchTheme } from './theme';

let currentConfig: Required<BadwersNotifyConfig> = mergeConfig({});
let currentTheme: Theme = 'light';
let initialized = false;
let unwatchTheme: (() => void) | null = null;

interface NotifyRecord {
  el: HTMLElement;
  position: Position;
  type: string;
  timerController?: ReturnType<typeof setupAutoClose>;
}

const active = new Map<string, NotifyRecord>();

function getPosition(options: NotifyOptions): Position {
  return options.position ?? currentConfig.position;
}

function initStyles(): void {
  if (initialized) return;
  injectStyles(CSS);
  currentTheme = getSystemTheme();
  unwatchTheme = watchTheme((theme) => {
    currentTheme = theme;
    for (const record of active.values()) {
      setElementTheme(record.el, record.type as never, theme);
    }
  });
  initialized = true;
}

function enforceMaxStack(position: Position): void {
  const stack = getStack(position);
  const children = stack.children;
  while (children.length >= currentConfig.maxStack) {
    const oldest = children[0] as HTMLElement;
    const id = oldest.id;
    const record = active.get(id);
    if (record) {
      record.timerController?.cancel();
      active.delete(id);
    }
    oldest.remove();
  }
}

export function _resetState(): void {
  currentConfig = mergeConfig({});
  currentTheme = 'light';
  initialized = false;
  if (unwatchTheme) {
    unwatchTheme();
    unwatchTheme = null;
  }
  active.clear();
}

export const BadwersNotify = {
  config(overrides: Partial<BadwersNotifyConfig>): Required<BadwersNotifyConfig> {
    currentConfig = mergeConfig(overrides);
    if (overrides.position) {
      validatePosition(overrides.position);
    }
    return currentConfig;
  },

  show(options: NotifyOptions): { id: string; close: () => void } {
    validateOptions(options);
    initStyles();

    const mergedOptions: NotifyOptions & { theme?: Theme } = {
      ...currentConfig,
      ...options,
      theme: currentTheme,
    };

    enforceMaxStack(getPosition(mergedOptions));

    const el = createNotifyElement(mergedOptions);
    const id = el.id;
    const position = getPosition(mergedOptions);
    const stack = getStack(position);

    stack.appendChild(el);
    showAnimation(el, position, currentConfig.animationDuration);

    const closeBtn = el.querySelector('.badwers-notify-close') as HTMLElement | null;
    if (closeBtn) {
      closeBtn.addEventListener('click', () => BadwersNotify.close(id));
      closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') BadwersNotify.close(id);
      });
    }

    const record: NotifyRecord = { el, position, type: options.type ?? 'info' };

    if (mergedOptions.autoclose !== false && mergedOptions.duration !== 0) {
      const duration = mergedOptions.duration ?? currentConfig.duration;
      record.timerController = setupAutoClose(el, duration, () => {
        BadwersNotify.close(id);
      });
    }

    active.set(id, record);

    return {
      id,
      close: () => BadwersNotify.close(id),
    };
  },

  info(options: NotifyOptions): { id: string; close: () => void } {
    return BadwersNotify.show({ ...options, type: 'info' });
  },

  success(options: NotifyOptions): { id: string; close: () => void } {
    return BadwersNotify.show({ ...options, type: 'success' });
  },

  attention(options: NotifyOptions): { id: string; close: () => void } {
    return BadwersNotify.show({ ...options, type: 'attention' });
  },

  warning(options: NotifyOptions): { id: string; close: () => void } {
    return BadwersNotify.show({ ...options, type: 'warning' });
  },

  close(id: string): void {
    const record = active.get(id);
    if (!record) return;

    record.timerController?.cancel();
    active.delete(id);

    const el = record.el;
    const position = record.position;

    const stack = el.parentElement;
    let nextFocus: HTMLElement | null = null;
    if (stack) {
      const siblings = Array.from(stack.children);
      const idx = siblings.indexOf(el);
      const nextEl = idx > 0 ? siblings[idx - 1] : siblings[idx + 1];
      if (nextEl) {
        nextFocus = nextEl.querySelector('.badwers-notify-close') as HTMLElement | null;
      }
      if (!nextFocus) nextFocus = stack;
    }

    closeAnimation(el, position, currentConfig.animationDuration, () => {
      el.remove();
      if (nextFocus) nextFocus.focus();
      if (stack && stack.children.length === 0) {
        removeStack(position as Position);
      }
    });
  },

  closeAll(): void {
    const ids = Array.from(active.keys());
    for (const id of ids) {
      BadwersNotify.close(id);
    }
  },
};
