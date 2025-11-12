export type RouteState =
  | undefined
  | null
  | {
      from?:
        | string
        | {
            pathname?: string | null;
            search?: string | null;
            hash?: string | null;
          };
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isLocationLike = (
  value: unknown,
): value is {
  pathname?: string | null;
  search?: string | null;
  hash?: string | null;
} =>
  isRecord(value) &&
  (typeof value.pathname === 'string' || value.pathname == null) &&
  (typeof value.search === 'string' || value.search == null) &&
  (typeof value.hash === 'string' || value.hash == null);

const isSafePathname = (
  value: string | null | undefined,
): string | undefined => {
  if (typeof value !== 'string') return undefined;
  if (!value.startsWith('/')) return undefined;
  if (value.startsWith('//')) return undefined;
  if (value.startsWith('http://') || value.startsWith('https://'))
    return undefined;
  return value;
};

const sanitizeSearch = (value: string | null | undefined) => {
  if (typeof value !== 'string') return '';
  return value.startsWith('?') ? value : '';
};

const sanitizeHash = (value: string | null | undefined) => {
  if (typeof value !== 'string') return '';
  return value.startsWith('#') ? value : '';
};

const buildPath = (location: {
  pathname?: string | null;
  search?: string | null;
  hash?: string | null;
}) => {
  const pathname = isSafePathname(location.pathname);
  if (!pathname) return undefined;

  const search = sanitizeSearch(location.search);
  const hash = sanitizeHash(location.hash);

  return `${pathname}${search}${hash}`;
};

const FALLBACK_PATH = '/';

export function resolveFrom(
  state: unknown,
  fallback: string = FALLBACK_PATH,
): string {
  if (!isRecord(state)) return fallback;

  const routeState = state as RouteState;
  const from = routeState?.from;

  if (typeof from === 'string') {
    return isSafePathname(from) ?? fallback;
  }

  if (isLocationLike(from)) {
    return buildPath(from) ?? fallback;
  }

  return fallback;
}
