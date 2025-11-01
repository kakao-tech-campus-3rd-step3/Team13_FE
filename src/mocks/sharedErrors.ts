import { HttpResponse } from 'msw';

export type ErrorCode =
  // Auth
  | 'AUTH_MISSING_CODE'
  | 'AUTH_INVALID_CODE'
  | 'AUTH_INVALID_REFRESH_TOKEN'
  // Certification
  | 'CERT_LOCAL_PART_REQUIRED'
  | 'CERT_RATE_LIMITED'
  | 'CERT_NOT_REQUESTED'
  | 'CERT_INVALID_TOKEN'
  | 'CERT_ALREADY_VERIFIED'
  // Profile
  | 'PROFILE_NOT_FOUND'
  | 'PROFILE_INVALID_NAME'
  | 'PROFILE_INVALID_DESCRIPTION'
  | 'PROFILE_INVALID_IMAGE_URL'
  // Sports
  | 'SPORTS_NOT_FOUND'
  // Games
  | 'GAME_NOT_FOUND'
  | 'GAME_INVALID_INPUT'
  | 'GAME_JOIN_NOT_ALLOWED'
  // Schools
  | 'SCHOOL_NOT_FOUND'
  // Reports
  | 'REPORT_NOT_FOUND'
  | 'REPORT_INVALID_STATUS'
  // Infra-level
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_SERVER_ERROR'
  | 'REQUEST_TIMEOUT';

export type ApiErrorResponse<Code extends ErrorCode = ErrorCode> = {
  error: { code: Code; message: string; fields?: Record<string, string> };
};

const errorCatalog: Record<ErrorCode, { status: number; message: string }> = {
  // Auth
  AUTH_MISSING_CODE: { status: 400, message: '인가 코드를 찾을 수 없습니다.' },
  AUTH_INVALID_CODE: {
    status: 401,
    message: '유효하지 않은 카카오 인가 코드입니다.',
  },
  AUTH_INVALID_REFRESH_TOKEN: {
    status: 400,
    message: '유효하지 않은 갱신 토큰입니다.',
  },

  // Certification
  CERT_LOCAL_PART_REQUIRED: {
    status: 400,
    message: '학교 이메일 localPart가 필요합니다.',
  },
  CERT_RATE_LIMITED: {
    status: 429,
    message: '인증 이메일 전송 제한을 초과했습니다.',
  },
  CERT_NOT_REQUESTED: {
    status: 400,
    message: '먼저 인증 이메일을 요청해 주세요.',
  },
  CERT_INVALID_TOKEN: { status: 400, message: '잘못된 인증 코드입니다.' },
  CERT_ALREADY_VERIFIED: {
    status: 409,
    message: '이미 인증이 완료되었습니다.',
  },

  // Profile
  PROFILE_NOT_FOUND: {
    status: 404,
    message: '요청한 사용자를 찾을 수 없습니다.',
  },
  PROFILE_INVALID_NAME: {
    status: 400,
    message: '닉네임은 최대 31자까지 가능합니다.',
  },
  PROFILE_INVALID_DESCRIPTION: {
    status: 400,
    message: '소개글은 최대 255자까지 가능합니다.',
  },
  PROFILE_INVALID_IMAGE_URL: {
    status: 400,
    message: '잘못된 이미지 URL 형식입니다.',
  },

  // Sports
  SPORTS_NOT_FOUND: {
    status: 404,
    message: '요청한 스포츠를 찾을 수 없습니다.',
  },

  // Games
  GAME_NOT_FOUND: { status: 404, message: '요청한 매치를 찾을 수 없습니다.' },
  GAME_INVALID_INPUT: { status: 400, message: '잘못된 매치 생성 입력입니다.' },
  GAME_JOIN_NOT_ALLOWED: {
    status: 409,
    message: '해당 매치에는 참여할 수 없습니다.',
  },

  // Schools
  SCHOOL_NOT_FOUND: { status: 404, message: '요청한 학교를 찾을 수 없습니다.' },

  // Reports
  REPORT_NOT_FOUND: { status: 404, message: '요청한 신고를 찾을 수 없습니다.' },
  REPORT_INVALID_STATUS: { status: 400, message: '잘못된 신고 상태 값입니다.' },

  // Infra
  UNAUTHORIZED: { status: 401, message: '로그인이 필요합니다.' },
  FORBIDDEN: { status: 403, message: '접근 권한이 없어요.' },
  VALIDATION_ERROR: { status: 422, message: '입력값을 확인해 주세요.' },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: '문제가 발생했어요. 잠시 후 다시 시도해 주세요.',
  },
  REQUEST_TIMEOUT: {
    status: 408,
    message: '요청이 지연되고 있어요. 다시 시도해 주세요.',
  },
};

export const createErrorResponse = (code: ErrorCode) => {
  const { status, message } = errorCatalog[code];
  return HttpResponse.json<ApiErrorResponse>(
    { error: { code, message } },
    { status },
  );
};

export const createValidationError = (
  fields: Record<string, string>,
  message = errorCatalog.VALIDATION_ERROR.message,
) => {
  return HttpResponse.json<ApiErrorResponse>(
    { error: { code: 'VALIDATION_ERROR', message, fields } },
    { status: errorCatalog.VALIDATION_ERROR.status },
  );
};
