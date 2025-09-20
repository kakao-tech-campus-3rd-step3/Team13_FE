import { useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

import Button from '@/components/button';
import IconButton, { ToggleIconButton } from '@/components/button/iconButton';
import LoginButton from '@/components/button/loginButton';
import RoundButton, {
  ToggleRoundButton,
} from '@/components/button/roundButton';
import RoundedRectangleButton from '@/components/button/roundedRectangleButton';
import TextButton, { ToggleTextButton } from '@/components/button/textButton';
import InputTextWithEmail from '@/components/inputTextWithEmail';
import MatchCard from '@/components/matchCard';
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

  const tabs = [
    { label: 'Home', content: <div>Home Content</div> },
    { label: 'Search', content: <div>Search Content</div> },
    { label: 'Profile', content: <div>Profile Content</div> },
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
        <p>Profile 클릭 횟수: {menuCount}</p>
        <p>Back 클릭 횟수: {backCount}</p>
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

        {/* MatchCard 컴포넌트 테스트 */}
        <h2>MatchCard 컴포넌트 테스트</h2>

        {/* 기본 카드 */}
        <MatchCard
          title="부산대 넉넉한 터 농구장"
          time="8/16 18:00 ~ 22:00"
          onCardClick={() => console.log('기본 카드 클릭됨')}
        />

        {/* 사람 수 표시가 있는 카드 */}
        {/* <MatchCard
          title="부산대 넉넉한 터 농구장"
          time="8/16 18:00 ~ 22:00"
          showPeopleCount={true}
          peopleCount="8/10"
          deadline="08/10 23:59"
          onCardClick={() => console.log('사람 수 카드 클릭됨')}
        /> */}

        {/* 두 개 버튼이 있는 카드 */}
        {/* <MatchCard
          title="부산대 넉넉한 터 농구장"
          time="8/16 18:00 ~ 22:00"
          buttons={[
            {
              text: '채팅 하기',
              variant: 'primary',
              onClick: () => console.log('채팅 버튼 클릭'),
            },
            {
              text: '취소 하기',
              variant: 'secondary',
              onClick: () => console.log('취소 버튼 클릭'),
            },
          ]}
          onCardClick={() => console.log('버튼 카드 클릭됨')}
        /> */}

        {/* 결과 버튼이 있는 카드 */}
        {/* <MatchCard
          title="부산대 넉넉한 터 농구장"
          time="8/16 18:00 ~ 22:00"
          resultButton={true}
          onResultClick={() => console.log('결과 버튼 클릭')}
          onCardClick={() => console.log('결과 카드 클릭됨')}
        /> */}

        {/* 이미지 없는 카드 */}
        {/* <MatchCard
          title="부산대 넉넉한 터 농구장"
          time="8/16 18:00 ~ 22:00"
          showPeopleCount={true}
          peopleCount="8/10"
          deadline="08/10 23:59"
          onCardClick={() => console.log('이미지 없는 카드 클릭됨')}
        /> */}
      </S.Container>
    </>
  );
}

export default App;
