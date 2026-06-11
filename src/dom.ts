export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  styles: Record<string, string> = {},
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  for (const [key, value] of Object.entries(styles)) {
    el.style.setProperty(
      key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
      value,
    );
  }
  return el;
}

let styleInjected = false;

export function resetStyleInjector(): void {
  styleInjected = false;
}

export function injectStyles(css: string): void {
  if (styleInjected) return;
  const existing = document.getElementById('badwers-notify-styles');
  if (existing) {
    styleInjected = true;
    return;
  }
  const style = document.createElement('style');
  style.id = 'badwers-notify-styles';
  style.textContent = css;
  document.head.appendChild(style);
  styleInjected = true;
}

export function removeElement(el: HTMLElement): void {
  el.remove();
}
