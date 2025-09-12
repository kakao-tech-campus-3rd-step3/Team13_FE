import { useState } from 'react';

import InputTextWithEmail from '@/components/inputTextWithEmail';
import NavigationTab from '@/components/navigationTab';

import * as S from './App.styled.ts';

function App() {
  const [email, setEmail] = useState('');
  const tabs = [
    { label: 'Home', content: <div>Home Content</div> },
    { label: 'Search', content: <div>Search Content</div> },
    { label: 'Profile', content: <div>Profile Content</div> },
  ];

  return (
    <>
      <S.Container>
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
