import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing4}`};
  border-bottom: 1px solid ${({ theme }) => theme.border.default};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.background.default},
    ${({ theme }) => theme.gray[100]}
  );
  box-shadow: 0 2px 8px rgba(26, 28, 32, 0.08);
`;

export const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.background.default};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.border.default};
`;

export const SkeletonAvatar = styled.div`
  position: relative;
  overflow: hidden;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.gray[300]};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.65),
      transparent
    );
    animation: ${shimmer} 1.4s ease-in-out infinite;
  }
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
  color: ${({ theme }) => theme.text.default};
`;

export const UserName = styled.strong`
  font-size: ${({ theme }) => theme.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.subtitle1Bold.lineHeight};
`;

export const UserEmail = styled.span`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.body2Regular.lineHeight};
`;

export const ActionArea = styled.div`
  margin-left: auto;
`;

export const PrimaryButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing3}`};
  border-radius: ${({ theme }) => theme.spacing2};
  border: none;
  background-color: ${({ theme }) => theme.blue[700]};
  color: ${({ theme }) => theme.gray[0]};
  font-size: ${({ theme }) => theme.body2Bold.fontSize};
  font-weight: ${({ theme }) => theme.body2Bold.fontWeight};
  line-height: ${({ theme }) => theme.body2Bold.lineHeight};
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(33, 124, 249, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(19, 95, 205, 0.35);
  }
`;

export const SkeletonMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
`;

export const SkeletonLine = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing1};
  background-color: ${({ theme }) => theme.gray[300]};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.65),
      transparent
    );
    animation: ${shimmer} 1.4s ease-in-out infinite;
  }
`;

export const SkeletonTitle = styled(SkeletonLine)`
  width: 7.5rem;
  height: 0.875rem;
`;

export const SkeletonSub = styled(SkeletonLine)`
  width: 10rem;
  height: 0.75rem;
`;

export const PlaceholderAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.blue[700]};
  background-color: ${({ theme }) => theme.blue[100]};
  font-size: ${({ theme }) => theme.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.body1Bold.fontWeight};
`;

export const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.text.sub};
  font-size: ${({ theme }) => theme.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.body1Regular.lineHeight};
`;
