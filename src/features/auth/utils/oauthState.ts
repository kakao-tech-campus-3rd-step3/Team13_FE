import { resolveFrom } from '@/routes/resolveFrom';

const toBase64Url = (value: string) =>
  btoa(unescape(encodeURIComponent(value)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

const fromBase64Url = (value: string) => {
  const pad = value.length % 4 === 0 ? '' : '='.repeat(4 - (value.length % 4));
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/') + pad;

  return decodeURIComponent(escape(atob(normalized)));
};

export function buildOAuthState(fromPath: string) {
  return toBase64Url(fromPath);
}

export function resolveOAuthState(
  rawState: string | null,
  fallback: string = '/home',
) {
  try {
    if (!rawState) return fallback;
    const decoded = fromBase64Url(rawState);
    return resolveFrom({ from: decoded }, fallback);
  } catch {
    return fallback;
  }
}
