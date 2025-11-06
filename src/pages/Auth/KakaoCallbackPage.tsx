import { useEffect, useRef } from 'react';
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
  const onceRef = useRef(false);

  useEffect(() => {
    if (!appHydrated || !sessionHydrated) {
      return;
    }

    if (onceRef.current) {
      return;
    }

    onceRef.current = true;

    void (async () => {
      const { to, options } = await handleKakaoCallback({ code, state });
      void navigate(to, { replace: true, ...(options ?? {}) });
    })();
  }, [appHydrated, sessionHydrated, code, state, navigate]);

  return <RouteSkeleton />;
}
