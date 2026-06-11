import type { Position } from './types';

export const CSS = `
@keyframes badwers-notify-slideInTop {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes badwers-notify-slideInBottom {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes badwers-notify-slideOutTop {
  from { transform: translateY(0); opacity: 1; }
  to   { transform: translateY(-100%); opacity: 0; }
}

@keyframes badwers-notify-slideOutBottom {
  from { transform: translateY(0); opacity: 1; }
  to   { transform: translateY(100%); opacity: 0; }
}

.badwers-notify--slideInTop {
  animation: badwers-notify-slideInTop 300ms ease forwards;
}

.badwers-notify--slideInBottom {
  animation: badwers-notify-slideInBottom 300ms ease forwards;
}

.badwers-notify--closing {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 300ms ease;
}

.badwers-notify {
  width: 360px;
  max-width: 360px;
  margin: 0 0 8px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: auto;
}

.badwers-notify-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #666666;
  font-size: 18px;
  line-height: 1;
  transition: color 200ms;
  border: none;
  background: transparent;
  flex-shrink: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badwers-notify-close:hover {
  color: #222222;
}

.badwers-notify-close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .badwers-notify,
  .badwers-notify--slideInTop,
  .badwers-notify--slideInBottom,
  .badwers-notify--closing {
    animation: none !important;
    transition: none !important;
  }
}

@media (max-width: 480px) {
  .badwers-notify {
    width: calc(100vw - 32px);
    max-width: calc(100vw - 32px);
  }
}
`;

function isTopPosition(position: Position): boolean {
  return position.endsWith('-top');
}

export function showAnimation(el: HTMLElement, position: Position, duration: number): void {
  const className = isTopPosition(position)
    ? 'badwers-notify--slideInTop'
    : 'badwers-notify--slideInBottom';

  el.classList.add(className);

  setTimeout(() => {
    el.classList.remove(className);
  }, duration);
}

export function closeAnimation(
  el: HTMLElement,
  _position: Position,
  duration: number,
  onComplete: () => void,
): void {
  el.classList.add('badwers-notify--closing');

  setTimeout(() => {
    onComplete();
  }, duration);
}

export function setupAutoClose(
  el: HTMLElement,
  duration: number,
  onClose: () => void,
): { pause: () => void; resume: () => void; cancel: () => void } {
  let remaining = duration;
  let timerId: ReturnType<typeof setTimeout> | null = setTimeout(() => {
    onClose();
  }, duration);
  let startedAt = Date.now();

  function pause(): void {
    if (timerId === null) return;
    clearTimeout(timerId);
    timerId = null;
    remaining -= Date.now() - startedAt;
    if (remaining < 0) remaining = 0;
  }

  function resume(): void {
    if (timerId !== null) return;
    startedAt = Date.now();
    timerId = setTimeout(() => {
      onClose();
    }, remaining);
  }

  function stopTimer(): void {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  el.addEventListener('mouseenter', pause);
  el.addEventListener('mouseleave', resume);

  return {
    pause,
    resume,
    cancel: () => {
      stopTimer();
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    },
  };
}
