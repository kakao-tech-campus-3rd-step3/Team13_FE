import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import { handleKakaoCallback } from '@/features/auth/services/kakao';
import { useHasHydrated } from '@/stores/appStore';
import { useSessionHydrated } from '@/stores/sessionStore';

export default function KakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appHydrated || !sessionHydrated) {
      return;
    }

    void (async () => {
      const nextPath = await handleKakaoCallback({ code, state });
      void navigate(nextPath, { replace: true });
    })();
  }, [appHydrated, sessionHydrated, code, state, navigate]);

  return <RouteSkeleton />;
}
