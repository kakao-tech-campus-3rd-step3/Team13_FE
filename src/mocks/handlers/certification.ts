import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';

type CertificationState = {
  email: string | null;
  verified: boolean;
  lastSentAt: string | null;
  verifiedAt: string | null;
};

const certificationState: CertificationState = {
  email: null,
  verified: false,
  lastSentAt: null,
  verifiedAt: null,
};

export const resetCertificationState = () => {
  certificationState.email = null;
  certificationState.verified = false;
  certificationState.lastSentAt = null;
  certificationState.verifiedAt = null;
};

export const certificationHandlers = [
  http.post('*/api/v1/members/me/certification/email', async ({ request }) => {
    const body = (await request.json()) as { email?: string };

    if (!body?.email) {
      return createErrorResponse('EMAIL_REQUIRED');
    }

    if (body.email === 'already@kan.com' && certificationState.verified) {
      return createErrorResponse('EMAIL_ALREADY_VERIFIED');
    }

    if (body.email === 'limit@kan.com') {
      return createErrorResponse('EMAIL_RATE_LIMITED');
    }

    const now = new Date().toISOString();

    certificationState.email = body.email;
    certificationState.lastSentAt = now;
    certificationState.verified = false;
    certificationState.verifiedAt = null;

    return HttpResponse.json({
      email: body.email,
      sentAt: now,
    });
  }),
  http.post('*/api/v1/members/me/certification/verify', async ({ request }) => {
    const body = (await request.json()) as { code?: string };

    if (!certificationState.email) {
      return createErrorResponse('EMAIL_NOT_REQUESTED');
    }

    if (!body?.code || body.code !== '000000') {
      return createErrorResponse('EMAIL_INVALID_TOKEN');
    }

    const now = new Date().toISOString();

    certificationState.verified = true;
    certificationState.verifiedAt = now;

    return HttpResponse.json({
      email: certificationState.email,
      verifiedAt: now,
    });
  }),
  http.get('*/api/v1/members/me/certification/status', () =>
    HttpResponse.json({
      email: certificationState.email,
      verified: certificationState.verified,
      lastSentAt: certificationState.lastSentAt,
      verifiedAt: certificationState.verifiedAt,
    }),
  ),
];
