import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  verifyCertification,
  type CertificationVerifyRequest,
} from '@/api/certification';
import { CERTIFICATION_STATUS_KEY } from '@/hooks/queries/certification/useCertificationStatus';
import { useActions } from '@/stores/appStore';

export function useVerifyCertification() {
  const queryClient = useQueryClient();
  const { setEmailVerified } = useActions();

  return useMutation({
    mutationFn: (variables: CertificationVerifyRequest) =>
      verifyCertification(variables),
    onSuccess: (data) => {
      setEmailVerified(Boolean(data?.isVerified));
      void queryClient.invalidateQueries({
        queryKey: CERTIFICATION_STATUS_KEY,
      });
    },
  });
}
