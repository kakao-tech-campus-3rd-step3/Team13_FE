import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 페이지 전체 컨테이너
 */
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.background.default};
`;

/**
 * 광고 배너 컨테이너
 */
export const BannerContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

/**
 * 카테고리 필터 배너
 */
export const FilterBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.spacing2};
  height: 50px;
  padding: 0 ${spacing.spacing3};
  background-color: ${colors.background.default};
`;

export const FilterLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
  flex: 1;
`;

export const FilterRightGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterItem = styled.div`
  /* 드롭다운 스타일 커스터마이징 */
  & > div {
    height: 30px;
    background-color: #f4f7fa;
    color: #4573a1;

    /* 아이콘 색상 */
    svg,
    path {
      color: #4573a1;
      fill: #4573a1;
    }
  }
`;

/**
 * 매치 리스트 컨테이너
 */
export const MatchListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.spacing3};
`;

/**
 * 매치 카드 아이템
 */
export const MatchCardItem = styled.div`
  margin-bottom: ${spacing.spacing3};

  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * 빈 상태 메시지
 */
export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.spacing8} ${spacing.spacing4};
  font-size: ${typography.body1Regular.fontSize};
  font-weight: ${typography.body1Regular.fontWeight};
  line-height: ${typography.body1Regular.lineHeight};
  color: ${colors.text.sub};
  text-align: center;
`;

/**
 * 로딩 스켈레톤
 */
export const LoadingSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing3};
  padding: ${spacing.spacing3};
`;

export const SkeletonCard = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(
    90deg,
    ${colors.background.fill} 25%,
    ${colors.background.disabled} 50%,
    ${colors.background.fill} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 8px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
