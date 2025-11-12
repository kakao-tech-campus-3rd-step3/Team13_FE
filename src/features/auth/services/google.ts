import type { AxiosError } from 'axios';
import type { NavigateOptions, To } from 'react-router-dom';

import { getGoogleOAuthUrl, exchangeGoogleCode } from '@/api/auth';
import { getCertificationStatus } from '@/api/certification';
import { getMyProfile } from '@/api/profile';
import {
  buildOAuthState,
  resolveOAuthState,
} from '@/features/auth/utils/oauthState';
import {
  DEFAULT_PROFILE_IMAGE_URL,
  ensureProfileDefaults,
} from '@/features/profile/constants';
import { notify } from '@/pages/notifications/notify';
import { useAppStore } from '@/stores/appStore';
import { useSessionStore } from '@/stores/sessionStore';

const AFTER_LOGIN_DEFAULT =
  typeof import.meta.env.VITE_AFTER_LOGIN_DEFAULT === 'string' &&
  import.meta.env.VITE_AFTER_LOGIN_DEFAULT.length > 0
    ? import.meta.env.VITE_AFTER_LOGIN_DEFAULT
    : '/home';

export async function startGoogleLogin(fromPath: string) {
  const state = buildOAuthState(fromPath);
  const redirectUri =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/google/callback`
      : undefined;

  const authUrl = await getGoogleOAuthUrl({ state, redirectUri });

  if (!authUrl) {
    notify.error('구글 로그인 주소를 불러오지 못했어요. 다시 시도해 주세요.');
    throw new Error('missing-google-auth-url');
  }

  window.location.assign(authUrl);
}

type NavigateResult = { to: To; options?: NavigateOptions };

export async function handleGoogleCallback({
  code,
  state,
}: {
  code: string | null;
  state: string | null;
}): Promise<NavigateResult> {
  console.group('🔐 [구글 로그인 콜백 시작]');
  console.log('1. 받은 파라미터:', {
    code: code?.substring(0, 20) + '...',
    state,
  });

  if (!code) {
    console.error('❌ code 파라미터 없음');
    console.groupEnd();
    notify.error('로그인에 실패했어요. 다시 시도해 주세요.');
    return { to: '/login' };
  }

  try {
    const redirectUri =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/google/callback`
        : undefined;

    console.log('2. redirectUri:', redirectUri);
    console.log('3. 토큰 교환 요청 시작...');

    const { token, accessToken, refreshToken } = await exchangeGoogleCode(
      code,
      redirectUri,
    );

    console.log('4. 토큰 교환 결과:', {
      token: token ? token.substring(0, 30) + '...' : null,
      accessToken: accessToken ? accessToken.substring(0, 30) + '...' : null,
      refreshToken: refreshToken ? refreshToken.substring(0, 30) + '...' : null,
    });

    const sessionToken = accessToken ?? token ?? null;

    if (!sessionToken) {
      console.error('❌ 세션 토큰 없음');
      console.groupEnd();
      notify.error('인증 토큰을 확인하지 못했어요. 다시 로그인해 주세요.');
      return { to: '/login' };
    }

    console.log('5. localStorage에 토큰 저장 중...');
    useSessionStore
      .getState()
      .actions.setSession(sessionToken, refreshToken ?? null);
    console.log('✅ 토큰 저장 완료');

    // 프로필 정보 조회
    console.log('6. 프로필 조회 시작...');
    console.log('   - API: GET /api/v2/members/me/profile');
    console.log(
      '   - Authorization 헤더:',
      `Bearer ${sessionToken.substring(0, 30)}...`,
    );

    let profile;
    try {
      const rawProfile = await getMyProfile();
      console.log('7. 프로필 조회 성공! 원본 데이터:', rawProfile);

      profile = ensureProfileDefaults(rawProfile);
      console.log('8. 기본값 적용 후 프로필:', profile);
    } catch (error) {
      console.error('❌ 프로필 조회 실패!');
      console.error('   - 에러 타입:', error?.constructor?.name);

      // Axios 에러 타입 체크
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError;
        console.error('   - 에러 메시지:', axiosError.message);
        console.error('   - 응답 상태:', axiosError.response?.status);
        console.error('   - 응답 데이터:', axiosError.response?.data);
        console.error('   - 요청 URL:', axiosError.config?.url);
        console.error('   - 요청 baseURL:', axiosError.config?.baseURL);
        console.error('   - 요청 헤더:', axiosError.config?.headers);
      } else if (error instanceof Error) {
        console.error('   - 에러 메시지:', error.message);
      }

      console.error('   - 전체 에러 객체:', error);

      notify.error(
        '프로필 정보를 불러오지 못했어요. 백엔드 팀에 문의가 필요합니다.',
      );
      console.groupEnd();
      throw error; // 에러를 throw하여 외부 catch로 전달
    }

    const { setUser, setEmailVerified } = useAppStore.getState().actions;
    const currentId = useAppStore.getState().user?.id ?? 0;

    console.log('9. appStore에 유저 정보 저장 중...');
    console.log('   - currentId:', currentId);
    console.log('   - name:', profile.name);
    console.log('   - email:', profile.email);
    console.log('   - avatarUrl:', profile.imageUrl);

    setUser({
      id: currentId,
      name: profile.name,
      email: profile.email,
      avatarUrl: profile.imageUrl ?? DEFAULT_PROFILE_IMAGE_URL,
    });
    console.log('✅ appStore 저장 완료');

    const resolvedPath = resolveOAuthState(state, AFTER_LOGIN_DEFAULT);
    console.log('10. 리다이렉트 경로:', resolvedPath);

    console.log('11. 이메일 인증 상태 확인 중...');
    try {
      const status = await getCertificationStatus();
      console.log('12. 인증 상태 응답:', status);

      const isVerified = Boolean(status?.isVerified);
      console.log('13. 인증 여부:', isVerified);

      setEmailVerified(isVerified);

      if (!isVerified) {
        console.log('14. 이메일 미인증 → /email-cert로 이동');
        console.groupEnd();
        return {
          to: '/email-cert',
          options: { state: { from: resolvedPath } },
        };
      }

      console.log('15. 이메일 인증 완료 → resolvedPath로 이동');
      console.groupEnd();
      return { to: resolvedPath };
    } catch (certError) {
      console.error('❌ 이메일 인증 상태 확인 실패:', certError);
      setEmailVerified(false);
      notify.info(
        '이메일 인증 상태를 확인하지 못했어요. 마이페이지에서 다시 시도해 주세요.',
      );
      console.log('16. 인증 확인 실패 → /email-cert로 이동');
      console.groupEnd();
      return {
        to: '/email-cert',
        options: { state: { from: resolvedPath } },
      };
    }
  } catch (outerError) {
    console.error('❌❌❌ 전체 로그인 프로세스 실패:', outerError);
    console.groupEnd();
    notify.error('인증 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
    return { to: '/login' };
  }
}
