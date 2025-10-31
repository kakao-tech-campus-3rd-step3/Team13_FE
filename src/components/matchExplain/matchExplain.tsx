import React from 'react';

import * as S from './matchExplain.styled';
import type { MatchExplainLayoutProps } from './matchExplain.types';

/**
 * MatchExplainLayout
 * 4개의 슬롯을 세로로 배치하는 레이아웃 컴포넌트
 */
export const MatchExplainLayout: React.FC<MatchExplainLayoutProps> = ({
  headerSlot,
  statusSlot,
  infoSlot,
  descriptionSlot,
  className,
}) => {
  return (
    <S.LayoutContainer className={className}>
      {headerSlot}
      {statusSlot}
      {infoSlot}
      {descriptionSlot}
    </S.LayoutContainer>
  );
};

export default MatchExplainLayout;
