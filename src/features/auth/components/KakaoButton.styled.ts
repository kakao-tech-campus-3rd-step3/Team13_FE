import styled from '@emotion/styled';

export const KakaoButtonRoot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing2};
  width: 100%;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing3}`};
  border: none;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.brand.kakaoYellow};
  color: ${({ theme }) => theme.brand.kakaoBrown};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.kakaoYellowHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.kakaoYellowPressed};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.28);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 1.125rem;
`;
