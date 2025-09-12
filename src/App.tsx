import { useState } from 'react';

import InputTextWithEmail from '@/components/inputTextWithEmail/index.ts';

import * as S from './App.styled.ts';

function App() {
  const [email, setEmail] = useState('');

  return (
    <>
      <S.Container>
        <InputTextWithEmail
          helperText="학교 이메일을 입력해주세요."
          onChange={setEmail}
        />
        <S.EmailText>입력한 이메일: {email}</S.EmailText>
      </S.Container>{' '}
    </>
  );
}

export default App;
