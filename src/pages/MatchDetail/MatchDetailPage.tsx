import { useNavigate, useParams } from 'react-router-dom';

import { RoundedRectangleButton } from '@/components/button/variants';
import { MatchExplain } from '@/components/matchExplain';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { useGameDetail } from '@/hooks/queries/games';
import { colors } from '@/theme/color';
import { convertSportIdToType, calculateDeadlineISO } from '@/utils/game.utils';

import * as S from './MatchDetailPage.styled.ts';

/**
 * 매치 상세 페이지
 * - 게임 상세 정보 표시
 * - 타이틀바, 이미지, 매치 정보, 참여하기 버튼으로 구성
 */
export default function MatchDetailPage() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  // gameId를 숫자로 변환
  const numericGameId = gameId ? parseInt(gameId, 10) : 0;

  // 게임 상세 정보 가져오기
  const { data: gameDetail, isLoading, isError } = useGameDetail(numericGameId);

  // 뒤로가기 핸들러
  const handleBack = () => {
    void navigate(-1);
  };

  // 참여하기 버튼 핸들러
  const handleJoin = () => {
    console.log('참여하기 버튼 클릭 - gameId:', numericGameId);
    // TODO: 참여하기 API 연동
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <S.PageContainer>
        <OriginTitleBar title="매칭 상세" onBack={handleBack} />
        <S.LoadingContainer>로딩 중...</S.LoadingContainer>
      </S.PageContainer>
    );
  }

  // 에러 상태
  if (isError || !gameDetail) {
    return (
      <S.PageContainer>
        <OriginTitleBar title="매칭 상세" onBack={handleBack} />
        <S.ErrorContainer>매치 정보를 불러올 수 없습니다.</S.ErrorContainer>
      </S.PageContainer>
    );
  }

  // 데이터 가공
  const sportType = convertSportIdToType(gameDetail.sportId);
  const deadline = calculateDeadlineISO(gameDetail.startTime);

  return (
    <S.PageContainer>
      {/* 타이틀바 */}
      <OriginTitleBar title="매칭 상세" onBack={handleBack} />

      {/* 매치 이미지 */}
      <S.ImageContainer>
        <S.MatchImage
          src={gameDetail.imageUrl ?? '/references/광고 배너.png'}
          alt={gameDetail.gameLocation}
        />
      </S.ImageContainer>

      {/* 매치 상세 정보 */}
      <S.ContentContainer>
        <MatchExplain
          sportType={sportType}
          location={gameDetail.gameLocation}
          startTime={gameDetail.startTime}
          duration={gameDetail.duration}
          currentPeople={gameDetail.currentPlayerCount}
          maxPeople={gameDetail.playerCount}
          deadline={deadline}
          description={gameDetail.description}
        />
      </S.ContentContainer>

      {/* 참여하기 버튼 */}
      <S.ButtonContainer>
        <RoundedRectangleButton
          size="lg"
          onClick={handleJoin}
          colorSet={{
            background: colors.blue[700],
            color: colors.gray[0],
            hover: colors.blue[800],
            active: colors.blue[900],
          }}
        >
          참여하기
        </RoundedRectangleButton>
      </S.ButtonContainer>
    </S.PageContainer>
  );
}
