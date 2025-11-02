import type { NavigateOptions, To } from 'react-router-dom';

import { getKakaoOAuthUrl, exchangeKakaoCode } from '@/api/auth';
import { getCertificationStatus } from '@/api/certification';
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

type NavigateResult = { to: To; options?: NavigateOptions };

export async function handleKakaoCallback({
  code,
  state,
}: {
  code: string | null;
  state: string | null;
}): Promise<NavigateResult> {
  if (!code) {
    notify.error('로그인에 실패했어요. 다시 시도해 주세요.');
    return { to: '/login' };
  }

  try {
    const { token, accessToken, refreshToken } = await exchangeKakaoCode(code);
    const sessionToken = accessToken ?? token ?? null;

    if (!sessionToken) {
      notify.error('인증 토큰을 확인하지 못했어요. 다시 로그인해 주세요.');
      return { to: '/login' };
    }

    useSessionStore
      .getState()
      .actions.setSession(sessionToken, refreshToken ?? null);

    const profile = await getMyProfile();
    const { setUser, setEmailVerified } = useAppStore.getState().actions;

    setUser({
      id: 0,
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.imageUrl,
    });

    let isVerified = true;
    try {
      const status = await getCertificationStatus();
      isVerified = Boolean(status?.isVerified);
      setEmailVerified(isVerified);
    } catch {
      // 인증 상태 확인 실패 시 기본 경로로 이동하지만 토스트만 안내
      setEmailVerified(true);
      notify.info(
        '이메일 인증 상태를 확인하지 못했어요. 마이페이지에서 다시 시도해 주세요.',
      );
    }

    const resolvedPath = resolveOAuthState(state, AFTER_LOGIN_DEFAULT);

    if (!isVerified) {
      return { to: '/email-cert', options: { state: { from: resolvedPath } } };
    }

    return { to: resolvedPath };
  } catch {
    notify.error('인증 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
    return { to: '/login' };
  }
}
