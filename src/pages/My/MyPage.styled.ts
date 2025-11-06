import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(59, 130, 246, 0.12) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const TitleBarWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing4} ${({ theme }) => theme.spacing4} 0;
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing5};
  max-width: 640px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing6} auto;
  padding: ${({ theme }) => theme.spacing7};
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow:
    0 1px 3px rgba(15, 23, 42, 0.06),
    0 8px 24px rgba(59, 130, 246, 0.12),
    0 16px 48px rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out 0.1s both;

  @media (max-width: 640px) {
    margin: ${({ theme }) => theme.spacing4};
    padding: ${({ theme }) => theme.spacing6} ${({ theme }) => theme.spacing5};
  }
`;

export const Heading = styled.h1`
  ${({ theme }) => theme.title1Bold};
  color: #0f172a;
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 112px;
  height: 112px;
  margin: ${({ theme }) => theme.spacing3} 0;
  animation: ${float} 3s ease-in-out infinite;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow:
    0 8px 24px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const AvatarBadge = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

  &::after {
    content: '✓';
    color: white;
    font-weight: bold;
  }
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
`;

export const UserName = styled.h2`
  ${({ theme }) => theme.title2Bold};
  color: #0f172a;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const UserEmail = styled.p`
  ${({ theme }) => theme.body1Regular};
  color: #64748b;
  margin: 0;
  font-size: 15px;
  word-break: break-all;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  ${({ theme }) => theme.body1Regular};
  color: #64748b;
  margin: 0;
  padding: ${({ theme }) => theme.spacing8};
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.6;

  &::before {
    content: '👤';
    display: block;
    font-size: 48px;
    margin-bottom: ${({ theme }) => theme.spacing3};
    opacity: 0.4;
  }
`;

export const StatusList = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing3};
  margin: ${({ theme }) => theme.spacing2} 0 0;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing2};
  padding: ${({ theme }) => theme.spacing4};
  border-radius: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.12);
    border-color: #bfdbfe;

    &::before {
      transform: scaleX(1);
    }
  }
`;

export const StatusLabel = styled.dt`
  ${({ theme }) => theme.label1Regular};
  color: #64748b;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatusValue = styled.dd`
  ${({ theme }) => theme.title2Bold};
  color: #0f172a;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing3};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing2};
  flex-wrap: wrap;
`;

export const EditButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing3} ${theme.spacing6}`};
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  ${({ theme }) => theme.body1Bold};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(37, 99, 235, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 24px rgba(37, 99, 235, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.35);
    outline-offset: 2px;
  }
`;

export const LogoutButton = styled.button`
  padding: ${({ theme }) => theme.spacing3} ${({ theme }) => theme.spacing6};
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  ${({ theme }) => theme.body1Bold};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(239, 68, 68, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(239, 68, 68, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 2px 8px rgba(220, 38, 38, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 3px solid rgba(239, 68, 68, 0.3);
    outline-offset: 2px;
  }
`;

// FCM 알림 토글 섹션
export const NotificationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing3};
  padding: ${({ theme }) => theme.spacing5};
  border-radius: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #bae6fd;
  margin-top: ${({ theme }) => theme.spacing4};
`;

export const NotificationToggleCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing4};
`;

export const NotificationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing1};
  flex: 1;
`;

export const NotificationTitle = styled.h3`
  ${({ theme }) => theme.body1Bold};
  color: #0f172a;
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing2};

  &::before {
    content: '🔔';
    font-size: 20px;
  }
`;

export const NotificationDescription = styled.p`
  ${({ theme }) => theme.body2Regular};
  color: #64748b;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const ToggleSwitch = styled.input`
  appearance: none;
  width: 52px;
  height: 28px;
  background: #cbd5e1;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:checked {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  }

  &:checked::before {
    transform: translateX(24px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.3);
    outline-offset: 2px;
  }
`;

export const FCMErrorMessage = styled.p`
  ${({ theme }) => theme.body2Regular};
  color: #ef4444;
  margin: ${({ theme }) => theme.spacing2} 0 0;
  font-size: 13px;
  padding: ${({ theme }) => theme.spacing2} ${({ theme }) => theme.spacing3};
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ef4444;

  &::before {
    content: '⚠️ ';
    margin-right: ${({ theme }) => theme.spacing1};
  }
`;
