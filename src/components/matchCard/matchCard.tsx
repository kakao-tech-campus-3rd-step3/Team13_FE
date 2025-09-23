import * as S from './matchCard.styled';
import type { MatchCardProps } from './types';

const MatchCard = ({
  title,
  time,
  image,
  showPeopleCount = false,
  peopleCount,
  deadline,
  buttons = [],
  resultButton = false,
  onResultClick,
  onCardClick,
}: MatchCardProps) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const handleResultClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    if (onResultClick) {
      onResultClick();
    }
  };

  return (
    <S.CardContainer onClick={handleCardClick}>
      <S.CardHeader>
        {/* 이미지 영역 - 조건부 렌더링 */}
        {image ? (
          <S.CardImage src={image} alt={title} />
        ) : (
          <S.NoImagePlaceholder>
            <S.LocationIcon />
          </S.NoImagePlaceholder>
        )}

        {/* 콘텐츠 영역 */}
        <S.CardContent>
          <S.CardTitle>장소: {title}</S.CardTitle>
          <S.CardTime>
            <S.TimeIcon />
            <span>시간: {time}</span>
          </S.CardTime>

          {/* 사람 수 정보 - 조건부 렌더링 */}
          {showPeopleCount && (
            <S.PeopleInfo>
              <S.PeopleCount>
                <S.PeopleIcon />
                <span>제한 인원 : {peopleCount}</span>
              </S.PeopleCount>
              {deadline && <S.Deadline>지원 마감 : {deadline}</S.Deadline>}
            </S.PeopleInfo>
          )}

          {/* 버튼 영역 - 조건부 렌더링 */}
          {buttons.length > 0 && (
            <S.ButtonContainer>
              {buttons.map((button, index) => (
                <S.ActionButton
                  key={`${button.text}-${index}`}
                  variant={button.variant}
                  disabled={button.disabled}
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 방지
                    button.onClick();
                  }}
                >
                  {button.text}
                </S.ActionButton>
              ))}
            </S.ButtonContainer>
          )}

          {/* 결과 버튼 - 조건부 렌더링 */}
          {resultButton && (
            <S.ResultButton onClick={handleResultClick}>
              결과 보기
            </S.ResultButton>
          )}
        </S.CardContent>
      </S.CardHeader>
    </S.CardContainer>
  );
};

export default MatchCard;
