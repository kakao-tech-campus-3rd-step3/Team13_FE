import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.gray[0]};
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  background-color: ${colors.gray[100]};
`;

export const MatchImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  object-position: center;
  display: block;

  /* 세로가 더 긴 이미지인 경우 정중앙 기준 1:1로 크롭 */
  aspect-ratio: auto;

  @supports (aspect-ratio: 1 / 1) {
    /* 이미지 높이가 너비보다 큰 경우 1:1 비율로 제한 */
    max-height: min(400px, 100vw);
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: ${spacing.spacing4};
  overflow-y: auto;
`;

export const ButtonContainer = styled.div`
  padding: ${spacing.spacing4};
  padding-top: ${spacing.spacing2};
  background-color: ${colors.gray[0]};

  button {
    width: 100%;
    height: 56px;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 18px;
  color: ${colors.gray[600]};
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 18px;
  color: ${colors.red[600]};
`;
