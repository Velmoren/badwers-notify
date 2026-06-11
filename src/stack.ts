import type { Position } from './types';
import { createElement } from './dom';

const stacks = new Map<Position, HTMLElement>();

function isTopPosition(position: Position): boolean {
  return position.endsWith('-top');
}

function getPositionStyles(position: Position): Record<string, string> {
  const styles: Record<string, string> = {
    position: 'fixed',
    zIndex: '10000',
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: isTopPosition(position) ? 'column' : 'column-reverse',
    padding: '8px',
  };

  if (position === 'right-top') {
    styles.top = '0';
    styles.right = '0';
  } else if (position === 'left-top') {
    styles.top = '0';
    styles.left = '0';
  } else if (position === 'center-top') {
    styles.top = '0';
    styles.left = '50%';
    styles.transform = 'translateX(-50%)';
  } else if (position === 'right-bottom') {
    styles.bottom = '0';
    styles.right = '0';
  } else if (position === 'left-bottom') {
    styles.bottom = '0';
    styles.left = '0';
  } else if (position === 'center-bottom') {
    styles.bottom = '0';
    styles.left = '50%';
    styles.transform = 'translateX(-50%)';
  }

  return styles;
}

export function getStack(position: Position): HTMLElement {
  let stack = stacks.get(position);
  if (stack) return stack;

  stack = createElement('div', { class: `badwers-notify-stack badwers-notify-stack--${position}` }, getPositionStyles(position));
  document.body.appendChild(stack);
  stacks.set(position, stack);
  return stack;
}

export function removeStack(position: Position): void {
  const stack = stacks.get(position);
  if (!stack) return;
  stack.remove();
  stacks.delete(position);
}

export function getStackCount(): number {
  return stacks.size;
}

export function resetStacks(): void {
  for (const stack of stacks.values()) {
    stack.remove();
  }
  stacks.clear();
}
