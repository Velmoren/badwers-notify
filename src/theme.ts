export type Theme = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

export function watchTheme(callback: (theme: Theme) => void): () => void {
  const mql = window.matchMedia(DARK_QUERY);
  const handler = (e: MediaQueryListEvent): void => {
    callback(e.matches ? 'dark' : 'light');
  };
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}
