import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import { handleGoogleCallback } from '@/features/auth/services/google';
import { useHasHydrated } from '@/stores/appStore';
import { useSessionHydrated } from '@/stores/sessionStore';

export default function GoogleCallbackPage() {
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
      const { to, options } = await handleGoogleCallback({ code, state });
      void navigate(to, { replace: true, ...(options ?? {}) });
    })();
  }, [appHydrated, sessionHydrated, code, state, navigate]);

  return <RouteSkeleton />;
}
