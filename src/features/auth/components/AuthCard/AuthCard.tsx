import type { PropsWithChildren } from 'react';

import * as S from './AuthCard.styled';

export function AuthCard({ children }: PropsWithChildren) {
  return (
    <S.Wrapper>
      <S.Card>{children}</S.Card>
    </S.Wrapper>
  );
}
