import { isAxiosError } from 'axios';

import { apiClient } from '@/api/core/axiosInstance';
import type { ApiError } from '@/types/api.types';

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

  try {
    const { data } = await apiClient.post<CertificationStatusResponse>(
      '/api/v1/members/me/certification/email',
      payload,
    );

    return data;
  } catch (error) {
    if (isAxiosError<ApiError>(error) && error.response?.status === 409) {
      const responsePayload = error.response.data as unknown;

      const resolvedCode = (() => {
        if (
          typeof responsePayload === 'object' &&
          responsePayload !== null &&
          'error' in responsePayload &&
          typeof (responsePayload as { error?: unknown }).error === 'object' &&
          (responsePayload as { error: { code?: unknown } }).error !== null
        ) {
          const nested = (
            responsePayload as {
              error: { code?: unknown };
            }
          ).error;
          if (typeof nested.code === 'string') {
            return nested.code;
          }
        }

        if (
          typeof responsePayload === 'object' &&
          responsePayload !== null &&
          'code' in responsePayload &&
          typeof (responsePayload as { code?: unknown }).code === 'string'
        ) {
          return (responsePayload as { code: string }).code;
        }

        return null;
      })();

      if (
        resolvedCode === 'EMAIL_ALREADY_VERIFIED' ||
        resolvedCode === 'CERT_ALREADY_VERIFIED'
      ) {
        return { isVerified: true };
      }
    }

    throw error;
  }
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
