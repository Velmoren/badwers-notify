import type { NotifyType } from './types';

const ICON_SIZE = 20;

function svg(viewBox: string, content: string, fill: string): string {
  return `<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="${viewBox}" fill="${fill}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

function infoPath(): string {
  return '<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2" fill="none"/><text x="10" y="14" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">i</text>';
}

function successPath(): string {
  return '<path d="M3 12l5 5L17 5" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
}

function attentionPath(): string {
  return '<path d="M10 2L2 18h16L10 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="13" r="1" fill="currentColor"/><rect x="9" y="8" width="2" height="4" fill="currentColor"/>';
}

function warningPath(): string {
  return '<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2" fill="none"/><line x1="10" y1="6" x2="10" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="15" r="1" fill="currentColor"/>';
}

const iconMap: Record<NotifyType, () => string> = {
  info: infoPath,
  success: successPath,
  attention: attentionPath,
  warning: warningPath,
};

export function getIcon(type: NotifyType, fill: string): string {
  return svg('0 0 20 20', iconMap[type](), fill);
}
