import { useQuery } from '@tanstack/react-query';

import {
  getCertificationStatus,
  type CertificationStatusResponse,
} from '@/api/certification';
import { useActions } from '@/stores/appStore';

export const CERTIFICATION_STATUS_KEY = ['certification', 'status'] as const;

export function useCertificationStatus() {
  const { setEmailVerified } = useActions();

  return useQuery<CertificationStatusResponse>({
    queryKey: CERTIFICATION_STATUS_KEY,
    queryFn: getCertificationStatus,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    onSuccess: ({ isVerified }) => {
      setEmailVerified(Boolean(isVerified));
    },
  });
}
