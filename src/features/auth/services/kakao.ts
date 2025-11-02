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
  const { authUrl } = await getKakaoOAuthUrl({ state });

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
    const { token } = await exchangeKakaoCode(code);
    useSessionStore.getState().actions.setSession(token);

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
