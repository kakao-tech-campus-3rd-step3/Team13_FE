import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type CertificationResponse = { isVerified: boolean };

type CertState = {
  localPart: string | null;
  domain: string | null;
  email: string | null;
  requested: boolean;
  isVerified: boolean;
};

const certState: CertState = {
  localPart: null,
  domain: null,
  email: null,
  requested: false,
  isVerified: false,
};

export const resetCertificationState = () => {
  certState.localPart = null;
  certState.domain = null;
  certState.email = null;
  certState.requested = false;
  certState.isVerified = false;
};

export const seedCertificationState = (state: Partial<CertState>) => {
  if (state.localPart !== undefined) {
    certState.localPart = state.localPart;
  }
  if (state.domain !== undefined) {
    certState.domain = state.domain;
  }
  if (state.email !== undefined) {
    certState.email = state.email;
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
  { email?: string; localPart?: string; domain?: string },
  CertificationResponse | ApiErrorResponse
>('*/api/v1/members/me/certification/email', async ({ request }) => {
  const body = (await request.json()) as {
    email?: string;
    localPart?: string;
    domain?: string;
  };

  const rawEmail = body.email?.trim() ?? '';
  const rawLocalPart = body.localPart?.trim() ?? '';
  const rawDomain = body.domain?.trim() ?? '';
  const derivedLocalPart =
    rawLocalPart ||
    (rawEmail.includes('@') ? rawEmail.split('@', 2)[0]?.trim() : '');
  const derivedDomain =
    rawDomain ||
    (rawEmail.includes('@') ? rawEmail.split('@', 2)[1]?.trim() : '');
  const normalizedEmail =
    derivedLocalPart && derivedDomain
      ? `${derivedLocalPart}@${derivedDomain}`
      : rawEmail;

  if (!derivedLocalPart) return createErrorResponse('CERT_LOCAL_PART_REQUIRED');
  if (derivedLocalPart === 'limit')
    return createErrorResponse('CERT_RATE_LIMITED');
  if (certState.isVerified && certState.localPart === derivedLocalPart)
    return createErrorResponse('CERT_ALREADY_VERIFIED');

  certState.localPart = derivedLocalPart;
  certState.domain = derivedDomain || null;
  certState.email = normalizedEmail || null;
  certState.requested = true;
  certState.isVerified = false;

  return HttpResponse.json<CertificationResponse>({ isVerified: false });
});

const verifyEmail = http.post<
  never,
  { email?: string; localPart?: string; domain?: string; code?: string },
  CertificationResponse | ApiErrorResponse
>('*/api/v1/members/me/certification/verify', async ({ request }) => {
  const body = (await request.json()) as {
    email?: string;
    localPart?: string;
    domain?: string;
    code?: string;
  };

  const rawEmail = body.email?.trim() ?? '';
  const rawLocalPart = body.localPart?.trim() ?? '';
  const rawDomain = body.domain?.trim() ?? '';
  const derivedLocalPart =
    rawLocalPart ||
    (rawEmail.includes('@') ? rawEmail.split('@', 2)[0]?.trim() : '');
  const derivedDomain =
    rawDomain ||
    (rawEmail.includes('@') ? rawEmail.split('@', 2)[1]?.trim() : '');
  const code = body.code?.trim();

  if (!certState.requested || !certState.localPart)
    return createErrorResponse('CERT_NOT_REQUESTED');
  if (!derivedLocalPart || derivedLocalPart !== certState.localPart)
    return createErrorResponse('CERT_NOT_REQUESTED');
  if (certState.domain && derivedDomain && derivedDomain !== certState.domain) {
    return createErrorResponse('CERT_NOT_REQUESTED');
  }
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
