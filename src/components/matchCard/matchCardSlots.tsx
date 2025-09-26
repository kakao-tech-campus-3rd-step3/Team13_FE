import React from 'react';

import * as S from './matchCardLayout.styled';
import type {
  ImageSlotProps,
  InfoSlotProps,
  PeopleInfoSlotProps,
  ActionSlotProps,
} from './matchCardLayout.types';

/**
 * 이미지 슬롯 컴포넌트
 * - 매치 장소의 이미지를 표시하거나 이미지가 없을 때 플레이스홀더를 표시
 * - matchCard, recruitingMatchCard, setMatchCard, finishedMatchCard 공통으로 사용
 */
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
        <S.ImagePlaceholder>
          {placeholder || <S.PlaceholderLocationIcon />}
        </S.ImagePlaceholder>
      )}
    </>
  );
};

/**
 * 정보 슬롯 컴포넌트
 * - 장소명과 시간 정보를 세로로 배치하여 표시
 * - 모든 매치카드 변형에서 공통으로 사용되는 핵심 정보
 */
export const InfoSlot: React.FC<InfoSlotProps> = ({ title, time }) => {
  return (
    <>
      <S.InfoTitle>장소: {title}</S.InfoTitle>
      <S.InfoTime>
        <S.TimeIcon />
        <span>시간: {time}</span>
      </S.InfoTime>
    </>
  );
};

/**
 * 인원 정보 슬롯 컴포넌트
 * - recruitingMatchCard에서만 사용
 * - 제한 인원과 지원 마감일을 우측 정렬로 표시
 */
export const PeopleInfoSlot: React.FC<PeopleInfoSlotProps> = ({
  peopleCount,
  deadline,
}) => {
  return (
    <S.PeopleInfoContainer>
      <S.PeopleCount>
        <S.PeopleIcon />
        <span>제한 인원 : {peopleCount}</span>
      </S.PeopleCount>
      {deadline && <S.Deadline>지원 마감 : {deadline}</S.Deadline>}
    </S.PeopleInfoContainer>
  );
};

/**
 * 액션 버튼 슬롯 컴포넌트
 * - setMatchCard의 '취소하기' 버튼과 finishedMatchCard의 '결과 보기' 버튼에 사용
 * - variant에 따라 다른 스타일이 적용됨
 */
export const ActionSlot: React.FC<ActionSlotProps> = ({
  text,
  variant = 'cancel',
  onClick,
  disabled = false,
}) => {
  // 이벤트 버블링 방지 핸들러
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트와 분리
    onClick(e);
  };

  if (variant === 'result') {
    return (
      <S.ResultButton onClick={handleClick} disabled={disabled}>
        {text}
      </S.ResultButton>
    );
  }

  // 기본값은 'cancel' 스타일
  return (
    <S.CancelButton onClick={handleClick} disabled={disabled}>
      {text}
    </S.CancelButton>
  );
};
