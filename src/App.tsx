import { useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

import Button from '@/components/button';
import HomeTitleBar from '@/components/homeTitleBar';
import IconButton from '@/components/iconButton';
import InputTextWithEmail from '@/components/inputTextWithEmail';
import LoginButton from '@/components/loginButton';
import LoginTitleBar from '@/components/loginTitleBar';
import NavigationTab from '@/components/navigationTab';
import OriginTitleBar from '@/components/originTitleBar';
import RoundButton from '@/components/roundButton';
import RoundedRectangleButton from '@/components/roundedRectangleButton';
import TextButton from '@/components/textButton';

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
          helperText="학교 이메일을 입력해주세요."
          onChange={setEmail}
        />
        <S.EmailText>입력한 이메일: {email}</S.EmailText>
        <Button onClick={() => setCount((c) => c + 1)}>카운트 증가</Button>
        <S.CountText>현재 카운트: {count}</S.CountText>
        <IconButton
          ariaLabel="좋아요 토글"
          pressed={liked}
          onPressedChange={setLiked}
        >
          {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </IconButton>
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
        <TextButton
          ariaLabel="텍스트 좋아요"
          pressed={textLiked}
          onPressedChange={setTextLiked}
        >
          {textLiked ? 'ON' : 'OFF'}
        </TextButton>
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
        <RoundButton
          ariaLabel="라운드 좋아요"
          pressed={roundLiked}
          onPressedChange={setRoundLiked}
        >
          {roundLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        </RoundButton>
        <RoundButton size="lg" onClick={() => setRoundCount((c) => c + 1)}>
          GO
        </RoundButton>
        <S.CountText>라운드 버튼 클릭 횟수: {roundCount}</S.CountText>
        <RoundedRectangleButton onClick={() => setRrCount((c) => c + 1)}>
          라운드 직사각 버튼
        </RoundedRectangleButton>
        <S.CountText>라운드 직사각 버튼 클릭 횟수: {rrCount}</S.CountText>
      </S.Container>
    </>
  );
}

export default App;
