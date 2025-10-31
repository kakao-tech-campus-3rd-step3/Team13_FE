import React from 'react';

import * as S from './matchExplain.styled';
import type { MatchExplainLayoutProps } from './matchExplain.types';

/**
 * MatchExplainLayout
 * 슬롯들을 배치하는 레이아웃 컴포넌트
 * StatusSlot과 InfoSlot을 같은 StatusSection 안에 통합
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
      <S.StatusSection>
        {statusSlot}
        {infoSlot}
      </S.StatusSection>
      {descriptionSlot}
    </S.LayoutContainer>
  );
};

export default MatchExplainLayout;
