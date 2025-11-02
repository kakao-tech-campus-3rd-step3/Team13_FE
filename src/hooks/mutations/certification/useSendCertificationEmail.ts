import { useMutation } from '@tanstack/react-query';

import { requestCertificationEmail } from '@/api/certification';

export function useSendCertificationEmail() {
  return useMutation({
    mutationFn: (localPart: string) => requestCertificationEmail(localPart),
  });
}
