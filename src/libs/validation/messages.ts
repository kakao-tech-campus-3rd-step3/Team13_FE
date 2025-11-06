export const validationMessages = {
  required: '필수 입력 항목입니다.',
  nickname: {
    tooLong: '닉네임은 31자 이하여야 합니다.',
  },
  description: {
    tooLong: '소개는 255자 이하여야 합니다.',
  },
  email: {
    invalid: '유효한 이메일 주소가 아닙니다.',
  },
  localPart: {
    required: '학교 이메일 아이디(@ 앞)를 입력해 주세요.',
  },
  code: {
    invalid: '인증 코드는 숫자 6자리입니다.',
  },
  imageUrl: {
    invalid: '올바른 이미지 URL이 아닙니다.',
    tooLong: '이미지 URL은 255자 이하여야 합니다.',
  },
} as const;

export type ValidationMessages = typeof validationMessages;
