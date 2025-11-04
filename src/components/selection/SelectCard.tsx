import type { ReactNode } from 'react';

import * as S from './SelectCard.styled';

type Props = {
  icon?: ReactNode;
  title: string;
  caption?: string;
  selected?: boolean;
  onToggle?: () => void;
};

export default function SelectCard({
  icon,
  title,
  caption,
  selected,
  onToggle,
}: Props) {
  return (
    <S.Card
      type="button"
      aria-pressed={Boolean(selected)}
      selected={selected}
      onClick={onToggle}
    >
      {icon && <S.Icon aria-hidden>{icon}</S.Icon>}
      <S.Texts>
        <S.Title>{title}</S.Title>
        {caption && <S.Caption>{caption}</S.Caption>}
      </S.Texts>
    </S.Card>
  );
}
