import styled from '@emotion/styled';

export const Bar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing4}`};
  background-color: ${({ theme }) => theme.background.fill};
  border-top: 1px solid ${({ theme }) => theme.border.default};
`;

export const Secondary = styled.button`
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.default};
  background: ${({ theme }) => theme.gray[100]};
  color: ${({ theme }) => theme.text.default};
  cursor: pointer;
`;

export const Primary = styled.button`
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  border-radius: 12px;
  border: 0;
  background: ${({ theme }) => theme.blue[700]};
  color: ${({ theme }) => theme.gray[0]};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
