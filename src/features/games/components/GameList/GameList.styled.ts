import styled from '@emotion/styled';

export const PageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing4};
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => theme.spacing3};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.background.fill};
  border: 1px solid ${({ theme }) => theme.border.disabled};
`;

export const FilterGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.label1Regular.lineHeight};
`;

export const Select = styled.select`
  min-width: 120px;
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing2}`};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border.default};
  background-color: ${({ theme }) => theme.background.default};
  font-size: ${({ theme }) => theme.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.body2Regular.lineHeight};
  color: ${({ theme }) => theme.text.default};
`;

export const RefreshButton = styled.button`
  margin-left: auto;
  border: none;
  border-radius: 999px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  background-color: ${({ theme }) => theme.blue[700]};
  color: ${({ theme }) => theme.gray[0]};
  font-size: ${({ theme }) => theme.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.label1Bold.lineHeight};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.blue[800]};
  }

  &:active {
    background-color: ${({ theme }) => theme.blue[900]};
  }
`;

export const CurrentSearch = styled.div`
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing3}`};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.fill};
  border: 1px dashed ${({ theme }) => theme.border.disabled};
  color: ${({ theme }) => theme.text.placeholder};
  font-size: ${({ theme }) => theme.label1Regular.fontSize};
`;

export const ListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing2};
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing3}`};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.default};
  background-color: ${({ theme }) => theme.background.default};
  box-shadow: 0 8px 16px rgba(9, 16, 29, 0.04);
`;

export const GameName = styled.strong`
  color: ${({ theme }) => theme.text.default};
  font-size: ${({ theme }) => theme.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.subtitle1Bold.lineHeight};
`;

export const GameMeta = styled.span`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.body2Regular.lineHeight};
`;

export const StateContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => theme.spacing4};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.disabled};
  background-color: ${({ theme }) => theme.background.fill};
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

export const PrimaryButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing4}`};
  background-color: ${({ theme }) => theme.brand.kakaoYellow};
  color: ${({ theme }) => theme.brand.kakaoBrown};
  font-size: ${({ theme }) => theme.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.label1Bold.lineHeight};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.brand.kakaoYellowHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.brand.kakaoYellowActive};
  }
`;

export const SecondaryButton = styled(RefreshButton)`
  margin-left: 0;
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
