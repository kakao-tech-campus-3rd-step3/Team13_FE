import styled from '@emotion/styled';

export const Card = styled.button<{ selected?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing2};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing3}`};
  border-radius: 14px;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.blue[600] : theme.border.disabled};
  background: ${({ theme }) => theme.gray[100]};
  text-align: left;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:focus-visible {
    outline: 3px solid rgba(33, 124, 249, 0.35);
    outline-offset: 2px;
  }
`;

export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
`;

export const Texts = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing1};
`;

export const Title = styled.strong`
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
`;

export const Caption = styled.span`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;
