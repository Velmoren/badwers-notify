import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createElement, injectStyles, removeElement, resetStyleInjector } from './dom';

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  resetStyleInjector();
});

afterEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
});

describe('createElement', () => {
  it('creates element with tag name', () => {
    const el = createElement('div');
    expect(el.tagName).toBe('DIV');
  });

  it('sets attributes', () => {
    const el = createElement('div', { id: 'test', role: 'alert' });
    expect(el.id).toBe('test');
    expect(el.getAttribute('role')).toBe('alert');
  });

  it('sets inline styles', () => {
    const el = createElement('div', {}, { color: 'red', fontSize: '14px' });
    expect(el.style.color).toBe('red');
    expect(el.style.fontSize).toBe('14px');
  });

  it('creates image element', () => {
    const el = createElement('img', { alt: 'icon' });
    expect(el.tagName).toBe('IMG');
    expect(el.getAttribute('alt')).toBe('icon');
  });
});

describe('injectStyles', () => {
  it('adds style element to head', () => {
    injectStyles('.foo { color: red; }');
    const style = document.getElementById('badwers-notify-styles');
    expect(style).not.toBeNull();
    expect(style!.textContent).toContain('.foo');
  });

  it('is idempotent', () => {
    injectStyles('.a {}');
    injectStyles('.b {}');
    const count = document.querySelectorAll('#badwers-notify-styles').length;
    expect(count).toBe(1);
  });
});

describe('removeElement', () => {
  it('removes element from DOM', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(document.body.contains(el)).toBe(true);
    removeElement(el);
    expect(document.body.contains(el)).toBe(false);
  });
});
