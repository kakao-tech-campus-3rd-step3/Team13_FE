import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type CertificationResponse = { isVerified: boolean };

type CertState = {
  localPart: string | null;
  requested: boolean;
  isVerified: boolean;
};

const certState: CertState = {
  localPart: null,
  requested: false,
  isVerified: false,
};

export const resetCertificationState = () => {
  certState.localPart = null;
  certState.requested = false;
  certState.isVerified = false;
};

export const seedCertificationState = (state: Partial<CertState>) => {
  if (state.localPart !== undefined) {
    certState.localPart = state.localPart;
  }
  if (state.requested !== undefined) {
    certState.requested = state.requested;
  }
  if (state.isVerified !== undefined) {
    certState.isVerified = state.isVerified;
  }
};

const requestEmail = http.post<
  never,
  { localPart?: string },
  CertificationResponse | ApiErrorResponse
>('*/api/v1/members/me/certification/email', async ({ request }) => {
  const { localPart } = (await request.json()) as { localPart?: string };

  if (!localPart || !localPart.trim())
    return createErrorResponse('CERT_LOCAL_PART_REQUIRED');
  if (localPart === 'limit') return createErrorResponse('CERT_RATE_LIMITED');
  if (certState.isVerified && certState.localPart === localPart)
    return createErrorResponse('CERT_ALREADY_VERIFIED');

  certState.localPart = localPart.trim();
  certState.requested = true;
  certState.isVerified = false;

  return HttpResponse.json<CertificationResponse>({ isVerified: false });
});

const verifyEmail = http.post<
  never,
  { localPart?: string; code?: string },
  CertificationResponse | ApiErrorResponse
>('*/api/v1/members/me/certification/verify', async ({ request }) => {
  const { localPart, code } = (await request.json()) as {
    localPart?: string;
    code?: string;
  };

  if (!certState.requested || !certState.localPart)
    return createErrorResponse('CERT_NOT_REQUESTED');
  if (!localPart || localPart.trim() !== certState.localPart)
    return createErrorResponse('CERT_NOT_REQUESTED');
  if (code !== '000000') return createErrorResponse('CERT_INVALID_TOKEN');

  certState.isVerified = true;
  return HttpResponse.json<CertificationResponse>({ isVerified: true });
});

const status = http.get<never, never, CertificationResponse>(
  '*/api/v1/members/me/certification/status',
  () =>
    HttpResponse.json<CertificationResponse>({
      isVerified: certState.isVerified,
    }),
);

export const certificationHandlers = [requestEmail, verifyEmail, status];
