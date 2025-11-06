import React from 'react';

import * as S from './matchCardLayout.styled';
import type {
  ImageSlotProps,
  InfoSlotProps,
  PeopleInfoSlotProps,
  ActionSlotProps,
} from './matchCardLayout.types';

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt = '매치 장소',
  placeholder,
}) => {
  return (
    <>
      {src ? (
        <S.SlotImage src={src} alt={alt} />
      ) : (
        <S.ImagePlaceholder>{placeholder ?? '🏀'}</S.ImagePlaceholder>
      )}
    </>
  );
};

export const InfoSlot: React.FC<InfoSlotProps> = ({ title, time }) => {
  return (
    <>
      <S.InfoTitle>{title}</S.InfoTitle>
      <S.InfoRow>
        <S.Icon aria-hidden="true">🕒</S.Icon>
        <span>{time}</span>
      </S.InfoRow>
    </>
  );
};

export const PeopleInfoSlot: React.FC<PeopleInfoSlotProps> = ({
  peopleCount,
  deadline,
}) => {
  return (
    <S.BadgeContainer>
      <S.Badge>
        <S.Icon aria-hidden="true">👥</S.Icon>
        <span>모집 {peopleCount}</span>
      </S.Badge>
      {deadline && (
        <S.Badge variant="warning">
          <S.Icon aria-hidden="true">⏳</S.Icon>
          <span>마감 {deadline}</span>
        </S.Badge>
      )}
    </S.BadgeContainer>
  );
};

export const ActionSlot: React.FC<ActionSlotProps> = ({
  text,
  variant = 'cancel',
  onClick,
  disabled = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <S.ActionButton
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {text}
    </S.ActionButton>
  );
};
