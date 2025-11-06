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
import {
  SportsDropDown,
  TimeSlotDropDown,
  LocationDropDownWithInput,
} from '@/components/dropDown';
import InputTextWithEmail from '@/components/inputTextWithEmail';
import {
  BasicMatchCard,
  RecruitingMatchCard,
  SetMatchCard,
  FinishedMatchCard,
} from '@/components/matchCard';
import { MatchExplain } from '@/components/matchExplain';
import NavigationTab from '@/components/navigationTab';
import HomeTitleBar from '@/components/titleBar/homeTitleBar';
import LoginTitleBar from '@/components/titleBar/loginTitleBar';
import OriginTitleBar from '@/components/titleBar/originTitleBar';

import * as S from './ComponentTestPage.styled';

/**
 * 컴포넌트 테스트 페이지
 * - /test 라우트에서 접근 가능
 */
function ComponentTestPage() {
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
    // TODO: 배포 시 console.log 제거 필요
    console.log('선택된 종목:', sport);
  };

  // TimeSlotDropDown 상태 관리
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const handleTimeSlotChange = (timeSlots: string[]) => {
    setSelectedTimeSlots(timeSlots);
    // TODO: 배포 시 console.log 제거 필요
    console.log('선택된 시간대들:', timeSlots);
  };

  // LocationDropDownWithInput 상태 관리
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationChange = (location: string | null) => {
    setSelectedLocation(location);
    // TODO: 배포 시 console.log 제거 필요
    console.log('선택된 장소:', location);
  };

  const tabs = [
    { label: '홈', content: <div>홈 콘텐츠</div> },
    { label: '검색', content: <div>검색 콘텐츠</div> },
    { label: '프로필', content: <div>프로필 콘텐츠</div> },
  ];

  return (
    <>
      <S.Section>
        <h2>데이터 훅 테스트</h2>
        <S.TestLinks>
          <a href="/test/sports">스포츠 목록 테스트 보기</a>
          <a href="/test/games">게임 리스트 테스트 보기</a>
        </S.TestLinks>
      </S.Section>
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

        {/* MatchCard 컴포넌트 테스트 (Preset 방식) */}
        <S.MatchCardTestSection>
          <h2>MatchCard 컴포넌트 테스트</h2>

          <S.MatchCardGroup>
            <h3>1. Preset 방식</h3>

            {/* BasicMatchCard */}
            <S.MatchCardItem>
              <h4>BasicMatchCard</h4>
              <BasicMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/16 18:00 ~ 22:00"
                image="/test-match-image.png"
                onCardClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('BasicMatchCard 클릭됨');
                }}
              />
            </S.MatchCardItem>

            {/* RecruitingMatchCard */}
            <S.MatchCardItem>
              <h4>RecruitingMatchCard</h4>
              <RecruitingMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/16 18:00 ~ 22:00"
                image="/test-match-image.png"
                peopleCount="8/10"
                deadline="08/10 23:59"
                onCardClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('RecruitingMatchCard 클릭됨');
                }}
              />
            </S.MatchCardItem>

            {/* SetMatchCard */}
            <S.MatchCardItem>
              <h4>SetMatchCard</h4>
              <SetMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/13 18:00 ~ 22:00"
                image="/test-match-image.png"
                onCancelClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('SetMatchCard 취소 클릭됨');
                }}
                onCardClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('SetMatchCard 클릭됨');
                }}
              />
            </S.MatchCardItem>

            {/* FinishedMatchCard */}
            <S.MatchCardItem>
              <h4>FinishedMatchCard</h4>
              <FinishedMatchCard
                title="부산대 넉넉한 터 농구장"
                time="8/3 18:00 ~ 22:00"
                image="/test-match-image.png"
                onResultClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('FinishedMatchCard 결과 클릭됨');
                }}
                onCardClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('FinishedMatchCard 클릭됨');
                }}
              />
            </S.MatchCardItem>
          </S.MatchCardGroup>

          <S.MatchCardGroup>
            <h3>2. 이미지 없는 버전들</h3>

            {/* 이미지 없는 기본 카드 */}
            <S.MatchCardItem>
              <h4>이미지 없는 BasicMatchCard</h4>
              <BasicMatchCard
                title="실내 체육관"
                time="8/20 14:00 ~ 16:00"
                onCardClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('이미지 없는 BasicMatchCard 클릭됨');
                }}
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
                onCardClick={() => {
                  // TODO: 배포 시 console.log 제거 필요
                  console.log('이미지 없는 RecruitingMatchCard 클릭됨');
                }}
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

        <S.MatchCardTestSection>
          <h2>LocationDropDownWithInput 테스트</h2>
          <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h3>장소 선택 드롭다운 + 텍스트 입력 (단일 선택)</h3>
            <LocationDropDownWithInput onChange={handleLocationChange} />
            <div
              style={{
                marginTop: '16px',
                padding: '8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
              }}
            >
              <strong>선택된 장소:</strong>{' '}
              {selectedLocation || '선택되지 않음'}
            </div>
            <div
              style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 일반 옵션 선택 시 즉시 값이 반영됩니다
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ &apos;기타&apos; 선택 시 텍스트 입력으로 전환됩니다
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 텍스트 입력 후 포커스 해제 시 값이 반영됩니다
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 되돌아가기 버튼으로 드롭다운으로 복귀합니다
            </div>
          </div>
        </S.MatchCardTestSection>

        {/* MatchExplain 테스트 섹션 */}
        <S.MatchCardTestSection>
          <h2>MatchExplain 컴포넌트 테스트</h2>

          <S.MatchCardGroup>
            <h3>1. 모집 중 - 농구 (Basketball)</h3>
            <div
              style={{
                height: '600px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <MatchExplain
                sportType="basketball"
                location="부산 금정구 부산대학로63번길 2 낙차원1동 농구코트"
                startTime="2025-11-09T20:00:00"
                duration={120}
                currentPeople={8}
                maxPeople={10}
                deadline="2025-11-09T23:59:00"
                description={`카테캠 부산대 4팀과 농구하실 사람을 구합니다.

이길 자신 있는 사람들만 도전하세요.

선수 약력
• 23, 24, 25년 부산대 총장배 우승
• 23, 24, 25년 부산대 학장배 우승`}
              />
            </div>
            <div
              style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 모집 중 상태 (현재인원 &lt; 제한인원 && 현재시간 &lt; 마감시간)
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 초록색 &quot;모집중&quot; 텍스트 표시
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 시간 자동 포맷: ISO 8601 → &quot;2025년 11월 09일 20:00 ~
              22:00&quot;
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 레이블(검은색) + 시간(빨간색) 분리
            </div>
          </S.MatchCardGroup>

          <S.MatchCardGroup>
            <h3>2. 모집 완료 - 풋살 (Futsal)</h3>
            <div
              style={{
                height: '600px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <MatchExplain
                sportType="futsal"
                location="서울 강남구 테헤란로 축구장"
                startTime="2025-07-20T18:00:00"
                duration={90}
                currentPeople={10}
                maxPeople={10}
                deadline="2025-07-19T23:59:00"
                description={`풋살 경기에 참여하실 분들을 모집합니다!

⚽ 경기 정보:
- 레벨: 초급~중급
- 준비물: 운동화, 개인 물병
- 주차: 가능

많은 참여 부탁드립니다!`}
              />
            </div>
            <div
              style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 모집 완료 상태 (인원 꽉 참: 10/10)
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 빨간색 &quot;모집완료&quot; 텍스트 표시
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 풋살 아이콘 자동 매핑
            </div>
          </S.MatchCardGroup>

          <S.MatchCardGroup>
            <h3>3. 긴 설명 텍스트 - 스크롤 테스트</h3>
            <div
              style={{
                height: '500px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <MatchExplain
                sportType="basketball"
                location="부산대학교 체육관"
                startTime="2025-09-15T14:00:00"
                duration={180}
                currentPeople={5}
                maxPeople={12}
                deadline="2025-09-14T18:00:00"
                description={`🏀 농구 동아리 정기 모임

안녕하세요! 부산대 농구 동아리입니다.

📅 일정 안내:
- 날짜: 2025년 9월 15일 (토)
- 시간: 14:00 ~ 17:00 (3시간)
- 장소: 부산대학교 체육관 2층

👥 모집 대상:
- 농구에 관심 있는 분이라면 누구나 환영!
- 초보자도 대환영입니다
- 레벨 무관, 열정만 있으면 OK!

🎯 진행 방식:
1. 14:00 - 14:30 : 웜업 & 스트레칭
2. 14:30 - 16:00 : 5 vs 5 게임
3. 16:00 - 16:30 : 휴식 & 간식
4. 16:30 - 17:00 : 자유 농구

💰 참가비:
- 1인당 5,000원
- 간식 & 음료 제공
- 체육관 대관료 포함

📝 준비물:
✓ 운동화 (농구화 권장)
✓ 운동복
✓ 개인 수건
✓ 물통

⚠️ 주의사항:
• 부상 방지를 위해 스트레칭 필수!
• 과격한 플레이는 자제해주세요
• 안전이 최우선입니다

💬 문의사항:
카카오톡 오픈채팅방으로 문의 바랍니다.

많은 참여 부탁드립니다! 🙌`}
              />
            </div>
            <div
              style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 긴 설명 텍스트 스크롤 가능
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ Description 영역만 스크롤 (나머지는 고정)
            </div>
            <div
              style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280' }}
            >
              ✅ 줄바꿈 유지 (pre-wrap)
            </div>
          </S.MatchCardGroup>
        </S.MatchCardTestSection>
      </S.Container>
    </>
  );
}

export default ComponentTestPage;
