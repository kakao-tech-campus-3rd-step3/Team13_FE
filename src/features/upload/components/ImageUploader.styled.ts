import styled from '@emotion/styled';

export const Container = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing4};
  padding: ${({ theme }) => `${theme.spacing5} ${theme.spacing4}`};
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.08),
    0 12px 32px rgba(59, 130, 246, 0.14);
  position: relative;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: ${({ theme }) => `${theme.spacing4} ${theme.spacing3}`};
    border-radius: 24px;
  }
`;

export const Header = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing2};
`;

export const Title = styled.h2`
  margin: 0;
  ${({ theme }) => theme.subtitle1Bold};
  color: ${({ theme }) => theme.text.default};
`;

export const Description = styled.p`
  margin: 0;
  ${({ theme }) => theme.body2Regular};
  color: ${({ theme }) => theme.text.sub};
`;

export const Body = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing4};
`;

export const PreviewRow = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: ${({ theme }) => theme.spacing4};
  align-items: center;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

export const PreviewRing = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.7),
    rgba(14, 116, 144, 0.7)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    0 8px 20px rgba(59, 130, 246, 0.2),
    0 2px 6px rgba(15, 23, 42, 0.1);
`;

export const PreviewInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.background.default};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PreviewPlaceholder = styled.span`
  ${({ theme }) => theme.label1Regular};
  color: ${({ theme }) => theme.text.placeholder};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing1};
  font-size: 13px;

  &::before {
    content: '📷';
    font-size: 24px;
  }
`;

export const PreviewMeta = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing1};
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing2};
  color: ${({ theme }) => theme.text.sub};
  ${({ theme }) => theme.label1Regular};
`;

export const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.background.fill};
  border: 1px solid ${({ theme }) => theme.border.disabled};
`;

export const ProgressArea = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing2};
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.background.fill};
  overflow: hidden;
`;

export const ProgressIndicator = styled.div<{ percent: number }>`
  width: ${({ percent }) => `${percent}%`};
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2563eb 0%, #06b6d4 100%);
  transition: width 0.18s ease;
`;

export const Status = styled.p`
  margin: 0;
  ${({ theme }) => theme.body2Regular};
  color: ${({ theme }) => theme.blue[700]};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing2};
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing4};
  height: 44px;
  border-radius: 14px;
  border: 1px solid transparent;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 35%, #38bdf8 100%);
  color: ${({ theme }) => theme.gray[0]};
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.28);
  border: none;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 16px 28px rgba(37, 99, 235, 0.32);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.blue[500]};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
  }
`;

export const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing4};
  height: 44px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border.default};
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  background: ${({ theme }) => theme.background.default};
  color: ${({ theme }) => theme.text.default};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.blue[500]};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
  }
`;

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing4};
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(248, 113, 113, 0.4);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  background: rgba(248, 113, 113, 0.16);
  color: ${({ theme }) => theme.red[600]};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 12px 20px rgba(248, 113, 113, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.blue[500]};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    transform: none;
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  ${({ theme }) => theme.body2Regular};
  color: ${({ theme }) => theme.red[600]};
`;
