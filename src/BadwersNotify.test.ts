import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BadwersNotify, _resetState } from './BadwersNotify';
import { resetStyleInjector } from './dom';
import { resetStacks } from './stack';

beforeEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  resetStyleInjector();
  resetStacks();
  _resetState();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

describe('BadwersNotify.config', () => {
  it('returns full config with defaults', () => {
    const cfg = BadwersNotify.config({});
    expect(cfg.position).toBe('right-top');
    expect(cfg.duration).toBe(5000);
  });

  it('merges overrides', () => {
    const cfg = BadwersNotify.config({ position: 'left-bottom' });
    expect(cfg.position).toBe('left-bottom');
  });
});

describe('BadwersNotify.show', () => {
  it('creates a notification element', () => {
    const result = BadwersNotify.show({ message: 'Test' });
    expect(result.id).toMatch(/^badwers-notify-\d+$/);
    expect(typeof result.close).toBe('function');
  });

  it('appends to document body stack', () => {
    BadwersNotify.show({ message: 'Hello' });
    const stack = document.querySelector('.badwers-notify-stack');
    expect(stack).not.toBeNull();
    expect(stack!.children.length).toBe(1);
  });

  it('injects styles on first show', () => {
    BadwersNotify.show({ message: 'Test' });
    const style = document.getElementById('badwers-notify-styles');
    expect(style).not.toBeNull();
  });

  it('returns close function that removes the notification', () => {
    const { id, close } = BadwersNotify.show({ message: 'Test' });
    close();
    vi.advanceTimersByTime(300);
    const el = document.getElementById(id);
    expect(el).toBeNull();
  });
});

describe('shorthand methods', () => {
  it('info sets type info', () => {
    const { id } = BadwersNotify.info({ message: 'Info' });
    vi.advanceTimersByTime(0);
    const el = document.getElementById(id);
    expect(el!.classList.contains('badwers-notify--info')).toBe(true);
  });

  it('success sets type success', () => {
    const { id } = BadwersNotify.success({ message: 'OK' });
    vi.advanceTimersByTime(0);
    const el = document.getElementById(id);
    expect(el!.classList.contains('badwers-notify--success')).toBe(true);
  });

  it('attention sets type attention', () => {
    const { id } = BadwersNotify.attention({ message: 'Careful' });
    vi.advanceTimersByTime(0);
    const el = document.getElementById(id);
    expect(el!.classList.contains('badwers-notify--attention')).toBe(true);
  });

  it('warning sets type warning', () => {
    const { id } = BadwersNotify.warning({ message: 'Danger' });
    vi.advanceTimersByTime(0);
    const el = document.getElementById(id);
    expect(el!.classList.contains('badwers-notify--warning')).toBe(true);
  });
});

describe('BadwersNotify.closeAll', () => {
  it('closes all active notifications', () => {
    BadwersNotify.show({ message: 'One' });
    BadwersNotify.show({ message: 'Two' });
    BadwersNotify.closeAll();
    vi.advanceTimersByTime(300);
    expect(document.querySelectorAll('.badwers-notify').length).toBe(0);
  });
});

describe('a11y', () => {
  it('sets role="alert" on notification', () => {
    const { id } = BadwersNotify.show({ message: 'Test' });
    const el = document.getElementById(id);
    expect(el!.getAttribute('role')).toBe('alert');
  });

  it('sets aria-live="assertive" for warning type', () => {
    const { id } = BadwersNotify.show({ message: 'Warning', type: 'warning' });
    const el = document.getElementById(id);
    expect(el!.getAttribute('aria-live')).toBe('assertive');
  });

  it('does not set aria-live for non-warning types', () => {
    const { id } = BadwersNotify.show({ message: 'Info', type: 'info' });
    const el = document.getElementById(id);
    expect(el!.getAttribute('aria-live')).toBeNull();
  });

  it('close button has aria-label', () => {
    const { id } = BadwersNotify.show({ message: 'Test', closeAriaLabel: 'Закрыть уведомление' });
    const el = document.getElementById(id);
    const btn = el!.querySelector('.badwers-notify-close');
    expect(btn!.getAttribute('aria-label')).toBe('Закрыть уведомление');
  });

  it('Escape key on close button triggers close', () => {
    const { id } = BadwersNotify.show({ message: 'Test' });
    const el = document.getElementById(id)!;
    const btn = el.querySelector('.badwers-notify-close')!;
    btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    vi.advanceTimersByTime(300);
    expect(document.getElementById(id)).toBeNull();
  });
});

describe('autoclose', () => {
  it('auto-closes after duration', () => {
    BadwersNotify.show({ message: 'Auto', duration: 3000 });
    expect(document.querySelectorAll('.badwers-notify').length).toBe(1);
    vi.advanceTimersByTime(3300);
    expect(document.querySelectorAll('.badwers-notify').length).toBe(0);
  });
});
