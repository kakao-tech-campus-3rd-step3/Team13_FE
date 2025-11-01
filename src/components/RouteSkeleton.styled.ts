import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  padding: ${spacing.spacing4};
  background-color: ${colors.background.fill};
`;

export const SkeletonLine = styled.div`
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(
      90deg,
      ${colors.gray[100]} 0%,
      ${colors.gray[200]} 50%,
      ${colors.gray[100]} 100%
    )
    0 0 / 200% 100%;
  animation: shimmer 1.6s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
