import { apiClient } from '@/api/core/axiosInstance';

export type CertificationStatusResponse = { isVerified: boolean };

export type CertificationEmailRequest = {
  email: string;
  localPart?: string;
  domain?: string;
};

export type CertificationVerifyRequest = {
  email: string;
  code: string;
  localPart?: string;
  domain?: string;
};

export async function getCertificationStatus() {
  const { data } = await apiClient.get<CertificationStatusResponse>(
    '/api/v1/members/me/certification/status',
  );

  return data;
}

export async function requestCertificationEmail(
  request: CertificationEmailRequest,
) {
  const payload: CertificationEmailRequest = {
    email: request.email.trim(),
  };

  if (request.localPart) {
    payload.localPart = request.localPart.trim();
  }

  if (request.domain) {
    payload.domain = request.domain.trim();
  }

  const { data } = await apiClient.post<CertificationStatusResponse>(
    '/api/v1/members/me/certification/email',
    payload,
  );

  return data;
}

export async function verifyCertification(request: CertificationVerifyRequest) {
  const payload: CertificationVerifyRequest = {
    email: request.email.trim(),
    code: request.code.trim(),
  };

  if (request.localPart) {
    payload.localPart = request.localPart.trim();
  }

  if (request.domain) {
    payload.domain = request.domain.trim();
  }

  const { data } = await apiClient.post<CertificationStatusResponse>(
    '/api/v1/members/me/certification/verify',
    payload,
  );

  return data;
}
