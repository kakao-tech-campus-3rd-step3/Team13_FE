import styled from '@emotion/styled';

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing4};
  padding: ${({ theme }) => `${theme.spacing6} ${theme.spacing4}`};
  min-height: 100vh;
  background: ${({ theme }) => theme.background.fill};
`;

export const TitleBarWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
`;

export const Card = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing4};
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing5} ${theme.spacing4}`};
  border-radius: 20px;
  background: ${({ theme }) => theme.gray[0]};
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
`;

export const Heading = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.title1Bold.lineHeight};
  text-align: center;
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
`;

export const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing1};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing3}`};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.default};
  background: ${({ theme }) => theme.background.default};
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};

  &:focus-visible {
    outline: 3px solid rgba(33, 124, 249, 0.35);
    outline-offset: 2px;
  }

  &:disabled {
    background: ${({ theme }) => theme.gray[100]};
    color: ${({ theme }) => theme.text.placeholder};
    cursor: not-allowed;
  }
`;

export const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.placeholder};
  font-size: ${({ theme }) => theme.label2Regular.fontSize};
  line-height: ${({ theme }) => theme.label2Regular.lineHeight};
`;

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing2};
  align-items: center;
`;

export const Primary = styled.button`
  border: 0;
  border-radius: 12px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  background: ${({ theme }) => theme.blue[700]};
  color: ${({ theme }) => theme.gray[0]};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Secondary = styled(Primary)`
  background: ${({ theme }) => theme.gray[200]};
  color: ${({ theme }) => theme.text.default};
`;

export const SchoolButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing3}`};
  border-radius: 12px;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.blue[700] : theme.border.default};
  background: ${({ theme, selected }) =>
    selected ? theme.blue[700] : theme.gray[100]};
  color: ${({ theme, selected }) =>
    selected ? theme.gray[0] : theme.text.sub};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Notice = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;
