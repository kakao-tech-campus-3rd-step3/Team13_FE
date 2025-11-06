import styled from '@emotion/styled';

export const GoogleButtonRoot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing2};
  width: 100%;
  min-height: 48px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 16px;
  background: ${({ theme }) => theme.gray[0]};
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
    background: ${({ theme }) => theme.gray[100]};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
    background: ${({ theme }) => theme.gray[200]};
  }

  &:focus-visible {
    outline: 3px solid rgba(33, 124, 249, 0.35);
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

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
