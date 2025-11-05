import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeTitleBar from '@/components/titleBar/homeTitleBar';

import * as S from './HomePage.styled';

export default function HomePage() {
  const navigate = useNavigate();

  const handleOpenProfile = useCallback(() => {
    void navigate('/my');
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    void navigate('/email-cert');
  }, [navigate]);

  return (
    <S.Page aria-label="home-page">
      <S.TitleBarWrapper>
        <HomeTitleBar title="홈" onMenu={handleOpenProfile} />
      </S.TitleBarWrapper>

      <S.Content>
        <S.Heading>가상 홈 화면</S.Heading>
        <S.Description>
          학교 이메일 인증을 완료하면 이용 가능한 홈 화면입니다. 상단의 프로필
          버튼을 눌러 내 계정으로 이동하거나 아래 버튼으로 이메일 인증 화면으로
          돌아갈 수 있어요.
        </S.Description>

        <S.Actions>
          <S.BackButton type="button" onClick={handleGoBack}>
            이메일 인증으로 돌아가기
          </S.BackButton>
        </S.Actions>
      </S.Content>
    </S.Page>
  );
}
