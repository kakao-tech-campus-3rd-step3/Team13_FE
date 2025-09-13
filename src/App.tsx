import { useState } from 'react';

import InputTextWithEmail from '@/components/inputTextWithEmail';
import LoginTitleBar from '@/components/loginTitleBar';
import NavigationTab from '@/components/navigationTab';
import OriginTitleBar from '@/components/originTitleBar';

import * as S from './App.styled.ts';

function App() {
  const [email, setEmail] = useState('');
  const [backCount, setBackCount] = useState(0);
  const tabs = [
    { label: 'Home', content: <div>Home Content</div> },
    { label: 'Search', content: <div>Search Content</div> },
    { label: 'Profile', content: <div>Profile Content</div> },
  ];

  return (
    <>
      <OriginTitleBar
        title="오리진 타이틀바"
        onBack={() => setBackCount((c) => c + 1)}
      />
      <LoginTitleBar />
      <S.Container>
        <p>Back 클릭 횟수: {backCount}</p>
        <NavigationTab tabs={tabs} />
        <InputTextWithEmail
          helperText="학교 이메일을 입력해주세요."
          onChange={setEmail}
        />
        <S.EmailText>입력한 이메일: {email}</S.EmailText>
      </S.Container>
    </>
  );
}

export default App;
