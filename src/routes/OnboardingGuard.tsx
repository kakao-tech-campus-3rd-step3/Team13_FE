import { Navigate, Outlet, useLocation } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import {
  useEmailVerified,
  useHasHydrated,
  useIsLoggedIn,
} from '@/stores/appStore';
import {
  usePrefHydrated,
  useOnboardingComplete,
} from '@/stores/preferencesStore';
import { useSessionHydrated } from '@/stores/sessionStore';

export default function OnboardingGuard() {
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const prefHydrated = usePrefHydrated();
  const isLoggedIn = useIsLoggedIn();
  const verified = useEmailVerified();
  const complete = useOnboardingComplete();
  const location = useLocation();

  if (!appHydrated || !sessionHydrated || !prefHydrated) {
    return <RouteSkeleton />;
  }

  if (!isLoggedIn || !verified) {
    return <Navigate to="/login" replace />;
  }

  if (!complete) {
    return (
      <Navigate to="/onboarding/sports" replace state={{ from: location }} />
    );
  }

  return <Outlet />;
}
