import styled from '@emotion/styled';

export const ListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing4};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing3};
  background-color: ${({ theme }) => theme.background.fill};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.disabled};
  box-shadow: 0 12px 24px rgba(9, 16, 29, 0.08);
`;

export const ListItem = styled.li`
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing3}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
  background-color: ${({ theme }) => theme.background.default};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.default};
`;

export const SportName = styled.span`
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.subtitle1Bold.lineHeight};
`;

export const SportMeta = styled.span`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.body2Regular.lineHeight};
`;

export const RefreshArea = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing2};
`;

export const PrimaryButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 999px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  background-color: ${({ theme }) => theme.brand.kakaoYellow};
  color: ${({ theme }) => theme.brand.kakaoBrown};
  font-size: ${({ theme }) => theme.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.label1Bold.lineHeight};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.brand.kakaoYellowHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.brand.kakaoYellowActive};
  }
`;

export const StateContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => theme.spacing4};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.background.fill};
  border: 1px solid ${({ theme }) => theme.border.disabled};
  align-items: center;
  text-align: center;
  box-shadow: inset 0 0 0 1px rgba(9, 16, 29, 0.02);
`;

export const StateMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
`;

export const SupportiveText = styled.span`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ theme }) => theme.blue[700]};
  color: ${({ theme }) => theme.gray[0]};

  &:hover {
    background-color: ${({ theme }) => theme.blue[800]};
  }

  &:active {
    background-color: ${({ theme }) => theme.blue[900]};
  }
`;

export const SkeletonLine = styled.div`
  width: 100%;
  height: 16px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.gray[200]} 0%,
    ${({ theme }) => theme.gray[100]} 50%,
    ${({ theme }) => theme.gray[200]} 100%
  );
  animation: shimmer 1.4s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      transform: translateX(-30%);
    }
    50% {
      transform: translateX(30%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
