import { describe, it, expect } from 'vitest';
import { defaultConfig, config, deepMerge } from './config';

describe('defaultConfig', () => {
  it('has all required defaults', () => {
    expect(defaultConfig.position).toBe('right-top');
    expect(defaultConfig.closable).toBe(true);
    expect(defaultConfig.autoclose).toBe(true);
    expect(defaultConfig.duration).toBe(5000);
    expect(defaultConfig.maxStack).toBe(10);
    expect(defaultConfig.animationDuration).toBe(300);
  });
});

describe('deepMerge', () => {
  it('shallow merges simple values', () => {
    const result = deepMerge({ a: 1, b: 2 }, { a: 10 });
    expect(result).toEqual({ a: 10, b: 2 });
  });

  it('deep merges nested objects', () => {
    const result = deepMerge(
      { nested: { a: 1, b: 2 }, flat: 1 } as Record<string, unknown>,
      { nested: { b: 20 } },
    );
    expect(result).toEqual({ nested: { a: 1, b: 20 }, flat: 1 });
  });

  it('ignores undefined values', () => {
    const result = deepMerge({ a: 1 } as Record<string, unknown>, { a: undefined });
    expect(result).toEqual({ a: 1 });
  });
});

describe('config', () => {
  it('returns full config with overrides', () => {
    const result = config({ position: 'left-bottom' });
    expect(result.position).toBe('left-bottom');
    expect(result.duration).toBe(5000);
  });
});
