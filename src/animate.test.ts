import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { showAnimation, closeAnimation, setupAutoClose } from './animate';

beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = '';
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('showAnimation', () => {
  it('adds slideInTop class for top position', () => {
    const el = document.createElement('div');
    showAnimation(el, 'right-top', 300);
    expect(el.classList.contains('badwers-notify--slideInTop')).toBe(true);
  });

  it('adds slideInBottom class for bottom position', () => {
    const el = document.createElement('div');
    showAnimation(el, 'right-bottom', 300);
    expect(el.classList.contains('badwers-notify--slideInBottom')).toBe(true);
  });

  it('removes animation class after duration', () => {
    const el = document.createElement('div');
    showAnimation(el, 'left-top', 300);
    vi.advanceTimersByTime(300);
    expect(el.classList.contains('badwers-notify--slideInTop')).toBe(false);
  });
});

describe('closeAnimation', () => {
  it('adds closing class', () => {
    const el = document.createElement('div');
    closeAnimation(el, 'right-top', 300, () => {});
    expect(el.classList.contains('badwers-notify--closing')).toBe(true);
  });

  it('calls onComplete after duration', () => {
    const el = document.createElement('div');
    const onComplete = vi.fn();
    closeAnimation(el, 'right-top', 300, onComplete);
    expect(onComplete).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(onComplete).toHaveBeenCalledOnce();
  });
});

describe('setupAutoClose', () => {
  it('calls onClose after duration', () => {
    const el = document.createElement('div');
    const onClose = vi.fn();
    setupAutoClose(el, 5000, onClose);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(5000);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('pauses on mouseenter and resumes on mouseleave', () => {
    const el = document.createElement('div');
    const onClose = vi.fn();
    setupAutoClose(el, 5000, onClose);

    vi.advanceTimersByTime(2000);
    el.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(4000);
    expect(onClose).not.toHaveBeenCalled();

    el.dispatchEvent(new MouseEvent('mouseleave'));
    vi.advanceTimersByTime(2999);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('cancel stops the timer and removes listeners', () => {
    const el = document.createElement('div');
    const onClose = vi.fn();
    const { cancel } = setupAutoClose(el, 5000, onClose);

    cancel();
    vi.advanceTimersByTime(5000);
    expect(onClose).not.toHaveBeenCalled();
  });
});
