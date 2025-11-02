import styled from '@emotion/styled';

export const KakaoButtonRoot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing2};
  width: 100%;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  border: none;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.brand.kakaoYellow};
  color: ${({ theme }) => theme.brand.kakaoBrown};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.kakaoYellowHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.brand.kakaoYellowPressed};
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.28);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing2};
`;

export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.brand.kakaoBrown};

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
