import { useMutation } from '@tanstack/react-query';

import {
  requestCertificationEmail,
  type CertificationEmailRequest,
} from '@/api/certification';

export function useSendCertificationEmail() {
  return useMutation({
    mutationFn: (payload: CertificationEmailRequest) =>
      requestCertificationEmail(payload),
  });
}
