import styled from '@emotion/styled';

export const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #e0f2fe 0%, #f8fafc 40%, #eef2ff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 20% 20%,
        rgba(59, 130, 246, 0.16) 0%,
        transparent 55%
      ),
      radial-gradient(
        circle at 80% 10%,
        rgba(96, 165, 250, 0.18) 0%,
        transparent 45%
      );
    pointer-events: none;
  }
`;

export const TitleBarWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  padding: ${({ theme }) => theme.spacing4} ${({ theme }) => theme.spacing4} 0;
  position: relative;
  z-index: 1;
`;

export const Card = styled.section`
  width: 100%;
  max-width: 640px;
  margin: ${({ theme }) => theme.spacing6} auto;
  padding: ${({ theme }) => `${theme.spacing6} ${theme.spacing6}`};
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(28px);
  box-shadow:
    0 24px 48px rgba(15, 23, 42, 0.12),
    0 4px 16px rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: grid;
  gap: ${({ theme }) => theme.spacing6};
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    margin: ${({ theme }) => theme.spacing5} ${({ theme }) => theme.spacing3};
    padding: ${({ theme }) => `${theme.spacing5} ${theme.spacing4}`};
    border-radius: 28px;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing3};
`;

export const Badge = styled.span`
  align-self: flex-start;
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing2}`};
  border-radius: 999px;
  background: rgba(30, 64, 175, 0.12);
  color: ${({ theme }) => theme.blue[800]};
  ${({ theme }) => theme.label2Bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  ${({ theme }) => theme.title1Bold};
  font-size: 28px;
  background: linear-gradient(135deg, #1d4ed8 0%, #0f172a 85%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  margin: 0;
  ${({ theme }) => theme.body1Regular};
  color: ${({ theme }) => theme.text.sub};
`;

export const AvatarPreview = styled.div`
  display: grid;
  place-items: center;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 50%, #c4b5fd 100%);
  box-shadow:
    0 18px 40px rgba(37, 99, 235, 0.25),
    0 6px 16px rgba(59, 130, 246, 0.18);
  border: 4px solid rgba(255, 255, 255, 0.9);
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.span`
  ${({ theme }) => theme.title2Bold};
  color: ${({ theme }) => theme.gray[0]};
  letter-spacing: -0.02em;
`;

export const AvatarBadge = styled.span`
  position: absolute;
  bottom: -4px;
  right: -4px;
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing2}`};
  border-radius: 999px;
  background: ${({ theme }) => theme.gray[900]};
  color: ${({ theme }) => theme.gray[0]};
  ${({ theme }) => theme.label2Bold};
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 6px 12px rgba(15, 23, 42, 0.22);
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing4};
  flex-wrap: wrap;
`;

export const AvatarText = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing1};
`;

export const AvatarTitle = styled.span`
  ${({ theme }) => theme.body1Bold};
  color: ${({ theme }) => theme.text.default};
`;

export const AvatarDescription = styled.span`
  ${({ theme }) => theme.body2Regular};
  color: ${({ theme }) => theme.text.sub};
`;
