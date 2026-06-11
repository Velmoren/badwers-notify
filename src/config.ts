import type { BadwersNotifyConfig, Position } from './types';
import { VALID_POSITIONS } from './types';

export const defaultConfig: Required<BadwersNotifyConfig> = {
  position: 'right-top',
  closable: true,
  autoclose: true,
  duration: 5000,
  maxStack: 10,
  animationDuration: 300,
  typeStyles: {
    info: { bg: '#ffffff', color: '#222222', iconColor: '#222222' },
    success: { bg: '#1e8a3a', color: '#ffffff', iconColor: '#ffffff' },
    attention: { bg: '#b85c00', color: '#ffffff', iconColor: '#ffffff' },
    warning: { bg: '#dc3545', color: '#ffffff', iconColor: '#ffffff' },
  },
  icons: {},
  closeAriaLabel: 'Close notification',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const result = { ...target };
  for (const key of Object.keys(source) as (keyof T)[]) {
    const val = source[key];
    if (val !== undefined) {
      if (
        val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        typeof target[key] === 'object' &&
        target[key] !== null &&
        !Array.isArray(target[key])
      ) {
        result[key] = deepMerge(
          target[key] as Record<string, unknown>,
          val as Record<string, unknown>,
        ) as T[keyof T];
      } else {
        result[key] = val as T[keyof T];
      }
    }
  }
  return result;
}

export function config(
  overrides: Partial<BadwersNotifyConfig>,
): Required<BadwersNotifyConfig> {
  return deepMerge(defaultConfig as Record<string, unknown>, overrides as Record<string, unknown>) as Required<BadwersNotifyConfig>;
}

export function validatePosition(position: Position): void {
  if (!VALID_POSITIONS.includes(position)) {
    throw new Error(
      `Invalid position "${position}". Valid positions: ${VALID_POSITIONS.join(', ')}`,
    );
  }
}

export function validateOptions(options: { message?: string }): void {
  if (!options.message || options.message.trim() === '') {
    throw new Error('Notification message is required and cannot be empty');
  }
}

let idCounter = 0;

export function generateId(): number {
  return ++idCounter;
}
