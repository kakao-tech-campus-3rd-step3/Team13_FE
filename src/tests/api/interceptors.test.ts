import { http, HttpResponse } from 'msw';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { apiClient } from '@/api/core/axiosInstance';
import {
  setRefreshInterceptorMode,
  setupInterceptors,
} from '@/api/core/interceptors';
import { server } from '@/mocks/server';
import { useSessionStore } from '@/stores/sessionStore';

const originalEnv = { ...import.meta.env };

const createLocalStorageMock = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => {
      store.clear();
    },
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  } as Storage;
};

const applyEnv = (env: Record<string, string>) => {
  Object.defineProperty(import.meta, 'env', {
    value: { ...originalEnv, ...env },
    configurable: true,
  });
};

let guardedResolver: () => Response = () => HttpResponse.json({ ok: true });

beforeAll(() => {
  applyEnv({
    MODE: 'development',
    VITE_USE_MSW: 'true',
    VITE_API_BASE_URL: 'http://example.com',
  });
  apiClient.defaults.baseURL = 'http://example.com';
  setupInterceptors();
  vi.stubGlobal('localStorage', createLocalStorageMock());
  setRefreshInterceptorMode(null);
});

afterAll(() => {
  applyEnv({});
  vi.unstubAllGlobals();
  setRefreshInterceptorMode(null);
});

afterEach(() => {
  localStorage.clear();
  useSessionStore.setState((state) => ({
    ...state,
    accessToken: null,
    refreshToken: null,
    hasHydrated: true,
    isRefreshing: false,
    queue: [],
  }));
  applyEnv({
    MODE: 'development',
    VITE_USE_MSW: 'true',
    VITE_API_BASE_URL: 'http://example.com',
  });
});

let refreshSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  guardedResolver = () => HttpResponse.json({ ok: true });
  refreshSpy = vi.fn();
  server.use(
    http.options('http://example.com/:path*', () =>
      HttpResponse.text('', { status: 200 }),
    ),
    http.get('http://example.com/echo', ({ request }) => {
      const auth = request.headers.get('authorization');
      return HttpResponse.json({ auth });
    }),
    http.get('http://example.com/need-auth', () =>
      HttpResponse.json({}, { status: 401 }),
    ),
    http.get('http://example.com/guarded', () => guardedResolver()),
    http.post('http://example.com/api/v1/auth/refresh', () => {
      refreshSpy();
      return HttpResponse.json(
        {
          accessToken: 'refreshed-access-token',
          refreshToken: 'refreshed-refresh-token',
        },
        { status: 200 },
      );
    }),
  );
});

describe('axios interceptors', () => {
  it('요청 시 Authorization 헤더를 자동으로 추가한다', async () => {
    useSessionStore.getState().actions.setSession('abc-token');

    const { data } = await apiClient.get<{ auth: string }>('/echo');

    expect(data.auth).toBe('Bearer abc-token');
  });

  it('401 응답을 받으면 실서버 모드에서 세션을 정리한다', async () => {
    applyEnv({
      MODE: 'production',
      VITE_USE_MSW: 'false',
      VITE_API_BASE_URL: 'http://example.com',
    });
    setRefreshInterceptorMode(false);
    useSessionStore.getState().actions.setSession('abc', 'refresh');

    await expect(apiClient.get('/need-auth')).rejects.toBeTruthy();
    expect(useSessionStore.getState().accessToken).toBeNull();
  });

  it('개발 모드에서는 refresh 후 원 요청을 한 번만 재시도한다', async () => {
    applyEnv({
      MODE: 'development',
      VITE_USE_MSW: 'true',
      VITE_API_BASE_URL: 'http://example.com',
    });
    setRefreshInterceptorMode(true);
    useSessionStore.getState().actions.setSession('expired', 'refresh-token');
    expect(import.meta.env.VITE_USE_MSW).toBe('true');
    expect(import.meta.env.MODE).toBe('development');
    expect(useSessionStore.getState().refreshToken).toBe('refresh-token');

    let firstCall = true;
    const guardedSpy = vi.fn();
    guardedResolver = () => {
      guardedSpy();
      if (firstCall) {
        firstCall = false;
        return HttpResponse.json({}, { status: 401 });
      }
      return HttpResponse.json({ ok: true });
    };

    let error: unknown;
    let data: { ok: boolean } | undefined;
    try {
      ({ data } = await apiClient.get<{ ok: boolean }>('/guarded'));
    } catch (err) {
      error = err;
    }

    expect(refreshSpy).toHaveBeenCalledTimes(1);
    expect(guardedSpy).toHaveBeenCalledTimes(2);
    expect(useSessionStore.getState().accessToken).not.toBeNull();
    expect(error).toBeUndefined();
    expect(data?.ok).toBe(true);
    expect(useSessionStore.getState().refreshToken).toBe(
      'refreshed-refresh-token',
    );
    expect(useSessionStore.getState().accessToken).toBe(
      'refreshed-access-token',
    );
  });
});
