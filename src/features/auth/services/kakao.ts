import { getKakaoOAuthUrl, exchangeKakaoCode } from '@/api/auth';
import { getMyProfile } from '@/api/profile';
import {
  buildOAuthState,
  resolveOAuthState,
} from '@/features/auth/utils/oauthState';
import { notify } from '@/pages/notifications/notify';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';

const AFTER_LOGIN_DEFAULT =
  typeof import.meta.env.VITE_AFTER_LOGIN_DEFAULT === 'string' &&
  import.meta.env.VITE_AFTER_LOGIN_DEFAULT.length > 0
    ? import.meta.env.VITE_AFTER_LOGIN_DEFAULT
    : '/my';

export async function startKakaoLogin(fromPath: string) {
  const state = buildOAuthState(fromPath);
  const redirectUri =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/kakao/callback`
      : undefined;
  const authUrl = await getKakaoOAuthUrl({ state, redirectUri });

  if (!authUrl) {
    notify.error('카카오 로그인 주소를 불러오지 못했어요. 다시 시도해 주세요.');
    return;
  }
  window.location.assign(authUrl);
}

export async function handleKakaoCallback({
  code,
  state,
}: {
  code: string | null;
  state: string | null;
}) {
  if (!code) {
    notify.error('로그인에 실패했어요. 다시 시도해 주세요.');
    return '/login';
  }

  try {
    const { token, accessToken, refreshToken } = await exchangeKakaoCode(code);
    const sessionToken = accessToken ?? token ?? null;

    if (!sessionToken) {
      notify.error('인증 토큰을 확인하지 못했어요. 다시 로그인해 주세요.');
      return '/login';
    }

    useSessionStore
      .getState()
      .actions.setSession(sessionToken, refreshToken ?? null);

    const profile = await getMyProfile();
    useAppStore.getState().actions.setUser({
      id: 0,
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.imageUrl,
    });

    return resolveOAuthState(state, AFTER_LOGIN_DEFAULT);
  } catch {
    notify.error('인증 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
    return '/login';
  }
}
