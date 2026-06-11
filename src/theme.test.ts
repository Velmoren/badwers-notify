import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSystemTheme, watchTheme } from './theme';

describe('getSystemTheme', () => {
  it('returns light by default', () => {
    expect(getSystemTheme()).toBe('light');
  });

  it('returns dark when matchMedia matches dark', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: true }),
    });
    expect(getSystemTheme()).toBe('dark');
    vi.unstubAllGlobals();
  });
});

describe('watchTheme', () => {
  let listener: ((e: { matches: boolean }) => void) | null = null;

  beforeEach(() => {
    listener = null;
    vi.stubGlobal('window', {
      matchMedia: () => ({
        matches: false,
        addEventListener: (_event: string, fn: typeof listener) => {
          listener = fn;
        },
        removeEventListener: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls callback when theme changes', () => {
    const callback = vi.fn();
    watchTheme(callback);
    listener!({ matches: true });
    expect(callback).toHaveBeenCalledWith('dark');
    listener!({ matches: false });
    expect(callback).toHaveBeenCalledWith('light');
  });

  it('returns unsubscribe function', () => {
    const removeEventListener = vi.fn();
    vi.stubGlobal('window', {
      matchMedia: () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener,
      }),
    });

    const unsubscribe = watchTheme(vi.fn());
    unsubscribe();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
