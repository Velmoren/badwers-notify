import type { NotifyOptions, NotifyType } from './types';
import type { Theme } from './theme';
import { generateId } from './config';
import { createElement } from './dom';
import { getIcon } from './icons';

const TYPE_BG_LIGHT: Record<NotifyType, string> = {
  info: '#ffffff',
  success: '#1e8a3a',
  attention: '#b85c00',
  warning: '#dc3545',
};

const TYPE_BG_DARK: Record<NotifyType, string> = {
  info: '#2d2d2d',
  success: '#1e7e34',
  attention: '#b85c00',
  warning: '#a71d2a',
};

const TYPE_COLOR_LIGHT: Record<NotifyType, string> = {
  info: '#222222',
  success: '#ffffff',
  attention: '#ffffff',
  warning: '#ffffff',
};

const TYPE_COLOR_DARK: Record<NotifyType, string> = {
  info: '#e0e0e0',
  success: '#ffffff',
  attention: '#ffffff',
  warning: '#ffffff',
};

export function getThemeColors(type: NotifyType, theme: Theme): { bg: string; color: string; iconColor: string } {
  const bg = theme === 'dark' ? TYPE_BG_DARK[type] : TYPE_BG_LIGHT[type];
  const color = theme === 'dark' ? TYPE_COLOR_DARK[type] : TYPE_COLOR_LIGHT[type];
  const iconColor = color;
  return { bg, color, iconColor };
}

export function setElementTheme(el: HTMLElement, type: NotifyType, theme: Theme): void {
  const { bg, color } = getThemeColors(type, theme);
  el.style.background = bg;
  el.style.color = color;

  const titleEl = el.querySelector('.badwers-notify-title') as HTMLElement | null;
  if (titleEl) titleEl.style.color = color;

  const msgEl = el.querySelector('.badwers-notify-message') as HTMLElement | null;
  if (msgEl) msgEl.style.color = color;

  const iconEl = el.querySelector('.badwers-notify-icon') as HTMLElement | null;
  if (iconEl) {
    iconEl.style.color = color;
    const svg = iconEl.querySelector('svg');
    if (svg) svg.setAttribute('fill', color);
  }
}

export function createNotifyElement(options: NotifyOptions & { theme?: Theme }): HTMLElement {
  const {
    message,
    title,
    type = 'info',
    closable = true,
    customClass,
    closeAriaLabel = 'Close notification',
    icon: customIcon,
    theme = 'light',
  } = options;

  const id = `badwers-notify-${generateId()}`;
  const { bg, color, iconColor } = getThemeColors(type, theme);

  const rootAttrs: Record<string, string> = {
    id,
    role: 'alert',
    class: `badwers-notify badwers-notify--${type}${customClass ? ` ${customClass}` : ''}`,
  };
  if (type === 'warning') {
    rootAttrs['aria-live'] = 'assertive';
  }

  const root = createElement('div', rootAttrs);

  root.style.cssText = `background:${bg};color:${color};display:flex;align-items:flex-start;padding:12px 16px;gap:12px;`;

  const iconHtml = customIcon ?? getIcon(type, iconColor);
  const iconEl = createElement('span', {
    class: 'badwers-notify-icon',
    style: `width:20px;height:20px;flex-shrink:0;margin-top:2px;color:${iconColor};`,
  });
  iconEl.innerHTML = iconHtml;
  root.appendChild(iconEl);

  const content = createElement('div', {
    class: 'badwers-notify-content',
    style: 'flex:1;min-width:0;',
  });

  if (title) {
    const titleEl = createElement('div', {
      class: 'badwers-notify-title',
      style: `font-size:15px;font-weight:600;line-height:1.3;margin:0 0 4px;color:${color};`,
    });
    titleEl.textContent = title;
    content.appendChild(titleEl);
  }

  const msgEl = createElement('div', {
    class: 'badwers-notify-message',
    style: `font-size:14px;font-weight:400;line-height:1.4;margin:0;color:${color};`,
  });
  msgEl.textContent = message;
  content.appendChild(msgEl);

  root.appendChild(content);

  if (closable) {
    const closeColor = type === 'info' ? '#666666' : 'rgba(255,255,255,0.85)';
    const closeBtn = createElement('button', {
      class: 'badwers-notify-close',
      'aria-label': closeAriaLabel,
      type: 'button',
      style: `color:${closeColor};font-size:18px;line-height:1;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:0;border:none;background:transparent;cursor:pointer;`,
    });
    closeBtn.innerHTML = '&times;';
    root.appendChild(closeBtn);
  }

  return root;
}
