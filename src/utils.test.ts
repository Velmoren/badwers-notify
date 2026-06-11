import { describe, it, expect } from 'vitest';
import { validatePosition, validateOptions, generateId } from './utils';

describe('validatePosition', () => {
  it('passes for valid positions', () => {
    expect(() => validatePosition('right-top')).not.toThrow();
    expect(() => validatePosition('left-top')).not.toThrow();
    expect(() => validatePosition('center-top')).not.toThrow();
    expect(() => validatePosition('right-bottom')).not.toThrow();
    expect(() => validatePosition('left-bottom')).not.toThrow();
    expect(() => validatePosition('center-bottom')).not.toThrow();
  });

  it('throws for invalid position', () => {
    expect(() => validatePosition('invalid' as never)).toThrow('Invalid position');
  });
});

describe('validateOptions', () => {
  it('passes with non-empty message', () => {
    expect(() => validateOptions({ message: 'Hello' })).not.toThrow();
  });

  it('throws with empty message', () => {
    expect(() => validateOptions({ message: '' })).toThrow('message is required');
  });

  it('throws with undefined message', () => {
    expect(() => validateOptions({})).toThrow('message is required');
  });
});

describe('generateId', () => {
  it('returns incrementing numbers', () => {
    const a = generateId();
    const b = generateId();
    expect(b).toBe(a + 1);
  });
});
