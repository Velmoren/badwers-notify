import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createNotifyElement } from './notify-element';
import { resetStyleInjector } from './dom';

beforeEach(() => {
  document.body.innerHTML = '';
  resetStyleInjector();
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('createNotifyElement', () => {
  it('creates a div with id badwers-notify-N', () => {
    const el = createNotifyElement({ message: 'Hello' });
    expect(el.tagName).toBe('DIV');
    expect(el.id).toMatch(/^badwers-notify-\d+$/);
  });

  it('sets role="alert"', () => {
    const el = createNotifyElement({ message: 'Test' });
    expect(el.getAttribute('role')).toBe('alert');
  });

  it('contains icon, content, and close button', () => {
    const el = createNotifyElement({ message: 'Test', closable: true });
    expect(el.querySelector('.badwers-notify-icon')).not.toBeNull();
    expect(el.querySelector('.badwers-notify-content')).not.toBeNull();
    expect(el.querySelector('.badwers-notify-close')).not.toBeNull();
  });

  it('does not include close button when closable=false', () => {
    const el = createNotifyElement({ message: 'Test', closable: false });
    expect(el.querySelector('.badwers-notify-close')).toBeNull();
  });

  it('sets title element when title is provided', () => {
    const el = createNotifyElement({ message: 'Msg', title: 'Title' });
    const titleEl = el.querySelector('.badwers-notify-title');
    expect(titleEl).not.toBeNull();
    expect(titleEl!.textContent).toBe('Title');
  });

  it('does not add title element when title is absent', () => {
    const el = createNotifyElement({ message: 'Msg' });
    expect(el.querySelector('.badwers-notify-title')).toBeNull();
  });

  it('sets message text', () => {
    const el = createNotifyElement({ message: 'Hello World' });
    expect(el.querySelector('.badwers-notify-message')!.textContent).toBe('Hello World');
  });

  it('sets aria-label on close button', () => {
    const el = createNotifyElement({ message: 'Test', closeAriaLabel: 'Закрыть' });
    const btn = el.querySelector('.badwers-notify-close')!;
    expect(btn.getAttribute('aria-label')).toBe('Закрыть');
  });

  it('applies customClass', () => {
    const el = createNotifyElement({ message: 'Test', customClass: 'my-class' });
    expect(el.classList.contains('my-class')).toBe(true);
  });

  it('sets type class', () => {
    const el = createNotifyElement({ message: 'Test', type: 'success' });
    expect(el.classList.contains('badwers-notify--success')).toBe(true);
  });
});
