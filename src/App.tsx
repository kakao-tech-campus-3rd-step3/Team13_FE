import { useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

import Button, {
  RoundedRectangleButton,
  RoundButton,
  TextButton,
  ToggleRoundButton,
  ToggleTextButton,
} from '@/components/button';
import IconButton, { ToggleIconButton } from '@/components/button/iconButton';
import LoginButton from '@/components/button/loginButton';
import { SportsDropDown, TimeSlotDropDown } from '@/components/dropDown';
import InputTextWithEmail from '@/components/inputTextWithEmail/index.ts';
import MatchCard, {
  BasicMatchCard,
  RecruitingMatchCard,
  SetMatchCard,
  FinishedMatchCard,
} from '@/components/matchCard';
import NavigationTab from '@/components/navigationTab';
import HomeTitleBar from '@/components/titleBar/homeTitleBar/index.ts';
import LoginTitleBar from '@/components/titleBar/loginTitleBar/index.ts';
import OriginTitleBar from '@/components/titleBar/originTitleBar/index.ts';

import * as S from './App.styled.ts';

function App() {
  const [email, setEmail] = useState('');
  const [backCount, setBackCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [iconLoading, setIconLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [textCount, setTextCount] = useState(0);
  const [textLiked, setTextLiked] = useState(false);
  const [textLoading, setTextLoading] = useState(false);
  const [roundLiked, setRoundLiked] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [rrCount, setRrCount] = useState(0);

  // SportsDropDown 상태 관리
  const [selectedSport, setSelectedSport] = useState<string>('');

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    console.log('선택된 종목:', sport);
  };

  // TimeSlotDropDown 상태 관리
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const handleTimeSlotChange = (timeSlots: string[]) => {
    setSelectedTimeSlots(timeSlots);
    console.log('선택된 시간대들:', timeSlots);
  };

  const tabs = [
    { label: '홈', content: <div>홈 콘텐츠</div> },
    { label: '검색', content: <div>검색 콘텐츠</div> },
    { label: '프로필', content: <div>프로필 콘텐츠</div> },
  ];

  return (
    <>
      <HomeTitleBar
        title="홈 타이틀바"
        onMenu={() => setMenuCount((c) => c + 1)}
      />
      <OriginTitleBar
        title="오리진 타이틀바"
        onBack={() => setBackCount((c) => c + 1)}
      />
      <LoginTitleBar />
      <S.Container>
        <p>프로필 클릭 횟수: {menuCount}</p>
        <p>뒤로 가기 클릭 횟수: {backCount}</p>
        <NavigationTab tabs={tabs} />
        <InputTextWithEmail
          value={email}
          helperText="학교 이메일을 입력해주세요."
          onChange={setEmail}
        />
        <S.EmailText>입력한 이메일: {email}</S.EmailText>
        <Button onClick={() => setCount((c) => c + 1)}>카운트 증가</Button>
        <S.CountText>현재 카운트: {count}</S.CountText>
        <ToggleIconButton
          ariaLabel="좋아요 토글"
          pressed={liked}
          onPressedChange={setLiked}
        >
          {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </ToggleIconButton>
        <IconButton
          ariaLabel="아이콘 로딩"
          loading={iconLoading}
          onClick={() => {
            setIconLoading(true);
            setTimeout(() => setIconLoading(false), 1000);
          }}
        >
          <FaThumbsUp />
        </IconButton>
        <IconButton ariaLabel="비활성 아이콘" disabled>
          <FaThumbsUp />
        </IconButton>
        <LoginButton
          ariaLabel="카카오 로그인"
          loading={loginLoading}
          onClick={() => {
            setLoginLoading(true);
            setTimeout(() => setLoginLoading(false), 1000);
          }}
        />
        <TextButton onClick={() => setTextCount((c) => c + 1)}>
          텍스트 증가
        </TextButton>
        <S.CountText>텍스트 카운트: {textCount}</S.CountText>
        <ToggleTextButton
          ariaLabel="텍스트 좋아요"
          pressed={textLiked}
          onPressedChange={setTextLiked}
        >
          {textLiked ? 'ON' : 'OFF'}
        </ToggleTextButton>
        <TextButton
          ariaLabel="텍스트 로딩 버튼"
          loading={textLoading}
          onClick={() => {
            setTextLoading(true);
            setTimeout(() => setTextLoading(false), 1000);
          }}
        >
          로딩
        </TextButton>
        <TextButton disabled>비활성 텍스트</TextButton>
        <ToggleRoundButton
          ariaLabel="라운드 좋아요"
          pressed={roundLiked}
          onPressedChange={setRoundLiked}
        >
          {roundLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </ToggleRoundButton>
        <RoundButton size="lg" onClick={() => setRoundCount((c) => c + 1)}>
          GO
        </RoundButton>
        <S.CountText>라운드 버튼 클릭 횟수: {roundCount}</S.CountText>
        <RoundedRectangleButton onClick={() => setRrCount((c) => c + 1)}>
          라운드 직사각 버튼
        </RoundedRectangleButton>
        <S.CountText>라운드 직사각 버튼 클릭 횟수: {rrCount}</S.CountText>

        {/* MatchCard 컴포넌트 테스트 (기존 방식 + Preset 방식) */}
        {/* TODO : 추후 기존 방식 테스트 코드는 삭제 */}
        <S.MatchCardTestSection>
          <h2>MatchCard 컴포넌트 테스트</h2>

          <S.MatchCardGroup>
            <h3>1. 기존 방식 (하위 호환성 테스트)</h3>

            {/* 기본 카드 - 기존 인터페이스 */}
            <S.MatchCardItem>
              <h4>기본 매치카드 (기본 인터페이스)</h4>
              <MatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/16 18:00 ~ 22:00"
                image="/test-match-image.png"
                onCardClick={() => console.log('기본 카드 클릭됨')}
              />
            </S.MatchCardItem>

            {/* 모집중 카드 - 기존 인터페이스 */}
            <S.MatchCardItem>
              <h4>모집중 매치카드 (기존 인터페이스)</h4>
              <MatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/16 18:00 ~ 22:00"
                image="/test-match-image.png"
                showPeopleCount={true}
                peopleCount="8/10"
                deadline="08/10 23:59"
                onCardClick={() => console.log('모집중 카드 클릭됨')}
              />
            </S.MatchCardItem>

            {/* 취소 가능한 카드 - 기존 인터페이스 */}
            <S.MatchCardItem>
              <h4>취소 가능한 매치카드 (기존 인터페이스)</h4>
              <MatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/13 18:00 ~ 22:00"
                image="/test-match-image.png"
                buttons={[
                  {
                    text: '취소하기',
                    variant: 'secondary',
                    onClick: () => console.log('취소 버튼 클릭'),
                  },
                ]}
                onCardClick={() => console.log('취소 카드 클릭됨')}
              />
            </S.MatchCardItem>

            {/* 결과 확인 카드 - 기존 인터페이스 */}
            <S.MatchCardItem>
              <h4>결과 확인 매치카드 (기존 인터페이스)</h4>
              <MatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/3 18:00 ~ 22:00"
                image="/test-match-image.png"
                resultButton={true}
                onResultClick={() => console.log('결과 버튼 클릭')}
                onCardClick={() => console.log('결과 카드 클릭됨')}
              />
            </S.MatchCardItem>
          </S.MatchCardGroup>

          <S.MatchCardGroup>
            <h3>2. 새로운 Preset 방식</h3>

            {/* BasicMatchCard */}
            <S.MatchCardItem>
              <h4>BasicMatchCard (BasicMatchCard preset)</h4>
              <BasicMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/16 18:00 ~ 22:00"
                image="/test-match-image.png"
                onCardClick={() => console.log('BasicMatchCard 클릭됨')}
              />
            </S.MatchCardItem>

            {/* RecruitingMatchCard */}
            <S.MatchCardItem>
              <h4>RecruitingMatchCard (RecruitingMatchCard preset)</h4>
              <RecruitingMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/16 18:00 ~ 22:00"
                image="/test-match-image.png"
                peopleCount="8/10"
                deadline="08/10 23:59"
                onCardClick={() => console.log('RecruitingMatchCard 클릭됨')}
              />
            </S.MatchCardItem>

            {/* SetMatchCard */}
            <S.MatchCardItem>
              <h4>SetMatchCard (SetMatchCard preset)</h4>
              <SetMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/13 18:00 ~ 22:00"
                image="/test-match-image.png"
                onCancelClick={() => console.log('SetMatchCard 취소 클릭됨')}
                onCardClick={() => console.log('SetMatchCard 클릭됨')}
              />
            </S.MatchCardItem>

            {/* FinishedMatchCard */}
            <S.MatchCardItem>
              <h4>FinishedMatchCard (FinishedMatchCard preset)</h4>
              <FinishedMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/3 18:00 ~ 22:00"
                image="/test-match-image.png"
                onResultClick={() =>
                  console.log('FinishedMatchCard 결과 클릭됨')
                }
                onCardClick={() => console.log('FinishedMatchCard 클릭됨')}
              />
            </S.MatchCardItem>
          </S.MatchCardGroup>

          <S.MatchCardGroup>
            <h3>3. 이미지 없는 버전들</h3>

            {/* 이미지 없는 기본 카드 */}
            <S.MatchCardItem>
              <h4>이미지 없는 BasicMatchCard</h4>
              <BasicMatchCard
                title="실내 체육관"
                time="8/20 14:00 ~ 16:00"
                onCardClick={() =>
                  console.log('이미지 없는 BasicMatchCard 클릭됨')
                }
              />
            </S.MatchCardItem>

            {/* 이미지 없는 모집중 카드 */}
            <S.MatchCardItem>
              <h4>이미지 없는 RecruitingMatchCard</h4>
              <RecruitingMatchCard
                title="동네 축구장"
                time="8/25 10:00 ~ 12:00"
                peopleCount="5/8"
                deadline="08/24 18:00"
                onCardClick={() =>
                  console.log('이미지 없는 RecruitingMatchCard 클릭됨')
                }
              />
            </S.MatchCardItem>
          </S.MatchCardGroup>
        </S.MatchCardTestSection>

        {/* SportsDropDown 테스트 섹션 */}
        <S.MatchCardTestSection>
          <h2>SportsDropDown 테스트</h2>
          <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h3>종목 선택 드롭다운 (단일 선택)</h3>
            <SportsDropDown onChange={handleSportChange} />
            <div
              style={{
                marginTop: '16px',
                padding: '8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
              }}
            >
              <strong>선택된 종목:</strong> {selectedSport || '선택되지 않음'}
            </div>
            <div
              style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 선택한 항목이 드롭다운 헤더에 표시됩니다
            </div>
          </div>
        </S.MatchCardTestSection>

        <S.MatchCardTestSection>
          <h2>TimeSlotDropDown 테스트</h2>
          <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h3>시간대 선택 드롭다운 (다중 선택)</h3>
            <TimeSlotDropDown onChange={handleTimeSlotChange} />
            <div
              style={{
                marginTop: '16px',
                padding: '8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
              }}
            >
              <strong>선택된 시간대:</strong>{' '}
              {selectedTimeSlots.length > 0
                ? selectedTimeSlots.join(', ')
                : '선택되지 않음'}
            </div>
            <div
              style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 다중 선택으로 여러 시간대를 선택할 수 있습니다
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 선택한 항목들이 쉼표로 구분되어 헤더에 표시됩니다
            </div>
          </div>
        </S.MatchCardTestSection>
      </S.Container>
    </>
  );
}

export default App;
