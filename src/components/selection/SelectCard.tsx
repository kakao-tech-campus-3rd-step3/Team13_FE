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
  const isSelected = Boolean(selected);

  return (
    <S.Card
      type="button"
      selected={isSelected}
      aria-pressed={isSelected}
      aria-label={`${title} ${isSelected ? '선택됨' : '선택 안됨'}`}
      onClick={onToggle}
    >
      <S.CheckIcon visible={isSelected} aria-hidden="true" />
      {icon && <S.IconWrapper selected={isSelected}>{icon}</S.IconWrapper>}
      <S.Title selected={isSelected}>{title}</S.Title>
      {caption && <S.Caption selected={isSelected}>{caption}</S.Caption>}
      <S.SelectionBadge visible={isSelected}>선택됨</S.SelectionBadge>
    </S.Card>
  );
}
