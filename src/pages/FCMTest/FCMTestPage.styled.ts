import styled from '@emotion/styled';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.fill};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background.default};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.brand.kakaoYellow};
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.gray[700]};
  margin-bottom: 2rem;
  text-align: center;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background.fill};
  border-radius: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.default};
  margin-bottom: 1rem;
`;

export const StatusList = styled.dl`
  display: grid;
  gap: 1rem;
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.background.default};
  border-radius: 6px;
`;

export const StatusLabel = styled.dt`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.gray[700]};
`;

export const StatusValue = styled.dd`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.default};
  word-break: break-all;
  text-align: right;
  max-width: 60%;
`;

export const StatusBadge = styled.span<{
  status: 'success' | 'error' | 'warning';
}>`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'success':
        return theme.green[600];
      case 'error':
        return theme.status.critical;
      case 'warning':
        return theme.yellow[600];
      default:
        return theme.gray[600];
    }
  }};
  color: white;
`;

export const TokenBox = styled.div`
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background.default};
  border: 1px solid ${({ theme }) => theme.border.default};
  border-radius: 6px;
  word-break: break-all;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.default};
  max-height: 150px;
  overflow-y: auto;
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.brand.kakaoYellow};
  color: ${({ theme }) => theme.brand.kakaoBrown};
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.brand.kakaoYellowHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.background.disabled};
    color: ${({ theme }) => theme.text.disabled};
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
}>`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return theme.brand.kakaoYellow;
      case 'danger':
        return theme.status.critical;
      case 'secondary':
      default:
        return theme.gray[700];
    }
  }};

  color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.brand.kakaoBrown : theme.gray[0]};

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.background.disabled};
    color: ${({ theme }) => theme.text.disabled};
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.status.criticalBackground};
  border-left: 4px solid ${({ theme }) => theme.status.critical};
  border-radius: 4px;
  color: ${({ theme }) => theme.red[800]};
  font-size: 0.875rem;
`;

export const BackLink = styled.a`
  display: inline-block;
  margin-top: 2rem;
  color: ${({ theme }) => theme.brand.kakaoYellow};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.brand.kakaoYellowHover};
    text-decoration: underline;
  }
`;
