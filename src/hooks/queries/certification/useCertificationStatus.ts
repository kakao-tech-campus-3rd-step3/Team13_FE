import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  getCertificationStatus,
  type CertificationStatusResponse,
} from '@/api/certification';
import { useActions } from '@/stores/appStore';

export const CERTIFICATION_STATUS_KEY = ['certification', 'status'] as const;

export function useCertificationStatus() {
  const { setEmailVerified } = useActions();

  const queryResult = useQuery<CertificationStatusResponse>({
    queryKey: CERTIFICATION_STATUS_KEY,
    queryFn: getCertificationStatus,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (queryResult.data?.isVerified === undefined) return;
    setEmailVerified(Boolean(queryResult.data.isVerified));
  }, [queryResult.data?.isVerified, setEmailVerified]);

  return queryResult;
}
