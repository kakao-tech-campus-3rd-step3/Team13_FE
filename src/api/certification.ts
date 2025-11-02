import { apiClient } from '@/api/core/axiosInstance';

export type CertificationStatusResponse = { isVerified: boolean };

export type CertificationEmailRequest = { localPart: string };

export type CertificationVerifyRequest = { localPart: string; code: string };

export async function getCertificationStatus() {
  const { data } = await apiClient.get<CertificationStatusResponse>(
    '/api/v1/members/me/certification/status',
  );

  return data;
}

export async function requestCertificationEmail(localPart: string) {
  const { data } = await apiClient.post<CertificationStatusResponse>(
    '/api/v1/members/me/certification/email',
    { localPart } satisfies CertificationEmailRequest,
  );

  return data;
}

export async function verifyCertification(localPart: string, code: string) {
  const { data } = await apiClient.post<CertificationStatusResponse>(
    '/api/v1/members/me/certification/verify',
    { localPart, code } satisfies CertificationVerifyRequest,
  );

  return data;
}
