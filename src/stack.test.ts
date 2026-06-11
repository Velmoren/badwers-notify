import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getStack, removeStack, getStackCount } from './stack';
import { resetStyleInjector } from './dom';

beforeEach(() => {
  document.body.innerHTML = '';
  resetStyleInjector();
});

afterEach(() => {
  document.body.innerHTML = '';
  // cleanup any stacks still referenced
  for (const pos of ['right-top', 'left-top', 'center-top', 'right-bottom', 'left-bottom', 'center-bottom'] as const) {
    removeStack(pos);
  }
});

describe('getStack', () => {
  it('creates a new stack container', () => {
    const stack = getStack('right-top');
    expect(stack).toBeDefined();
    expect(stack.tagName).toBe('DIV');
    expect(document.body.contains(stack)).toBe(true);
  });

  it('returns existing container on second call', () => {
    const a = getStack('right-top');
    const b = getStack('right-top');
    expect(a).toBe(b);
  });

  it('sets fixed position and z-index', () => {
    const stack = getStack('left-top');
    expect(stack.style.position).toBe('fixed');
    expect(stack.style.zIndex).toBe('10000');
  });

  it('sets pointer-events none', () => {
    const stack = getStack('center-top');
    expect(stack.style.pointerEvents).toBe('none');
  });

  it('sets flex-direction column for top positions', () => {
    expect(getStack('right-top').style.flexDirection).toBe('column');
    expect(getStack('left-top').style.flexDirection).toBe('column');
    expect(getStack('center-top').style.flexDirection).toBe('column');
  });

  it('sets flex-direction column-reverse for bottom positions', () => {
    expect(getStack('right-bottom').style.flexDirection).toBe('column-reverse');
    expect(getStack('left-bottom').style.flexDirection).toBe('column-reverse');
    expect(getStack('center-bottom').style.flexDirection).toBe('column-reverse');
  });

  it('positions top stacks at top of viewport', () => {
    const rightTop = getStack('right-top');
    expect(rightTop.style.top).toBe('0px');
    const leftTop = getStack('left-top');
    expect(leftTop.style.top).toBe('0px');
  });

  it('positions bottom stacks at bottom of viewport', () => {
    const rightBottom = getStack('right-bottom');
    expect(rightBottom.style.bottom).toBe('0px');
    const leftBottom = getStack('left-bottom');
    expect(leftBottom.style.bottom).toBe('0px');
  });
});

describe('removeStack', () => {
  it('removes stack container from DOM', () => {
    const stack = getStack('left-top');
    removeStack('left-top');
    expect(document.body.contains(stack)).toBe(false);
  });

  it('removes stack from internal map', () => {
    getStack('left-top');
    removeStack('left-top');
    expect(getStackCount()).toBe(0);
  });
});
