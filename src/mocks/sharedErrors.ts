import { HttpResponse } from 'msw';

export type ErrorCode =
  | 'AUTH_MISSING_CODE'
  | 'AUTH_INVALID_CODE'
  | 'EMAIL_REQUIRED'
  | 'EMAIL_ALREADY_VERIFIED'
  | 'EMAIL_RATE_LIMITED'
  | 'EMAIL_NOT_REQUESTED'
  | 'EMAIL_INVALID_TOKEN'
  | 'PROFILE_NOT_FOUND'
  | 'PROFILE_INVALID_NAME'
  | 'PROFILE_INVALID_DESCRIPTION'
  | 'PROFILE_INVALID_IMAGE_URL';

const errorCatalog: Record<ErrorCode, { status: number; message: string }> = {
  AUTH_MISSING_CODE: {
    status: 400,
    message: '인가 코드를 찾을 수 없습니다.',
  },
  AUTH_INVALID_CODE: {
    status: 401,
    message: '유효하지 않은 카카오 인가 코드입니다.',
  },
  EMAIL_REQUIRED: {
    status: 400,
    message: '이메일 정보가 필요합니다.',
  },
  EMAIL_ALREADY_VERIFIED: {
    status: 409,
    message: '이미 인증이 완료된 이메일입니다.',
  },
  EMAIL_RATE_LIMITED: {
    status: 429,
    message: '인증 이메일 전송 제한을 초과했습니다.',
  },
  EMAIL_NOT_REQUESTED: {
    status: 400,
    message: '먼저 인증 이메일을 요청해 주세요.',
  },
  EMAIL_INVALID_TOKEN: {
    status: 400,
    message: '잘못된 인증 코드입니다.',
  },
  PROFILE_NOT_FOUND: {
    status: 404,
    message: '요청한 사용자를 찾을 수 없습니다.',
  },
  PROFILE_INVALID_NAME: {
    status: 400,
    message: '닉네임은 2~20자 사이여야 합니다.',
  },
  PROFILE_INVALID_DESCRIPTION: {
    status: 400,
    message: '소개글은 0~150자 사이여야 합니다.',
  },
  PROFILE_INVALID_IMAGE_URL: {
    status: 400,
    message: '잘못된 이미지 URL 형식입니다.',
  },
};

export type ApiErrorResponse<Code extends ErrorCode = ErrorCode> = {
  error: { code: Code; message: string };
};

export const createErrorResponse = (code: ErrorCode) => {
  const { status, message } = errorCatalog[code];

  return HttpResponse.json<ApiErrorResponse>(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  );
};
