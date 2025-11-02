import styled from '@emotion/styled';

export const ToggleSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing4}`};
  background: ${({ theme }) => theme.background.default};
`;

export const ToggleCard = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing3}`};
  border-radius: ${({ theme }) => theme.spacing2};
  border: 1px solid ${({ theme }) => theme.border.disabled};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.gray[0]},
    ${({ theme }) => theme.gray[100]}
  );
  box-shadow: 0 2px 10px rgba(26, 28, 32, 0.04);
`;

export const ToggleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
`;

export const ToggleTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.body1Bold.lineHeight};
`;

export const ToggleDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;

export const ToggleInput = styled.input`
  appearance: none;
  position: relative;
  width: 3.25rem;
  height: 1.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.gray[300]};
  transition: background 0.2s ease;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.gray[0]};
    box-shadow: 0 2px 8px rgba(26, 28, 32, 0.2);
    transition: transform 0.2s ease;
  }

  &:checked {
    background: ${({ theme }) => theme.blue[700]};
  }

  &:checked::before {
    transform: translateX(1.5rem);
  }

  &:focus-visible {
    outline: 3px solid rgba(33, 124, 249, 0.4);
    outline-offset: 2px;
  }
`;

export const SkeletonGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing2};
`;

export const SkeletonLine = styled.div`
  width: 70%;
  height: 0.875rem;
  border-radius: ${({ theme }) => theme.spacing1};
  background: ${({ theme }) => theme.gray[300]};
  opacity: 0.7;
`;
