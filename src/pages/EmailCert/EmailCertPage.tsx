import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/button';
import RouteSkeleton from '@/components/RouteSkeleton';
import { useActions, useHasHydrated } from '@/stores/appStore';

import * as S from './EmailCertPage.styled';

export default function EmailCertPage() {
  const { setEmailVerified } = useActions();
  const location = useLocation();
  const navigate = useNavigate();
  const hydrated = useHasHydrated();

  const redirectPath = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null;
    return state?.from?.pathname ?? '/my';
  }, [location.state]);

  const handleVerify = useCallback(() => {
    setEmailVerified(true);
    void navigate(redirectPath, { replace: true });
  }, [navigate, redirectPath, setEmailVerified]);

  if (!hydrated) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="email-cert-page">
      <S.Card>
        <S.Heading>이메일 인증이 필요해요</S.Heading>
        <S.Description>
          계정을 안전하게 보호하기 위해 이메일 주소를 인증해야 해요. 아래 버튼을
          눌러 인증을 완료하면 계속 진행할 수 있습니다.
        </S.Description>
        <S.Helper>
          실제 이메일 전송 없이 상태만 업데이트하는 데모 플로우입니다.
        </S.Helper>
        <S.ButtonGroup>
          <Button onClick={handleVerify} ariaLabel="email-verify-complete">
            인증 완료
          </Button>
        </S.ButtonGroup>
      </S.Card>
    </S.Page>
  );
}
