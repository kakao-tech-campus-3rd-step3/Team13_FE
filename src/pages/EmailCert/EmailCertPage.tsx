import { isAxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import RouteSkeleton from '@/components/RouteSkeleton';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import {
  formatMMSS,
  isValidCode,
  isValidEmailFormat,
  parseSchoolEmail,
} from '@/features/certification/utils/email';
import { useSendCertificationEmail } from '@/hooks/mutations/certification/useSendCertificationEmail';
import { useVerifyCertification } from '@/hooks/mutations/certification/useVerifyCertification';
import { useCertificationStatus } from '@/hooks/queries/certification/useCertificationStatus';
import { notify } from '@/pages/notifications/notify';
import { resolveFrom } from '@/routes/resolveFrom';
import { useHasHydrated } from '@/stores/appStore';
import { useSessionHydrated } from '@/stores/sessionStore';

import * as S from './EmailCertPage.styled';

const COOLDOWN_SECONDS = 45;

export default function EmailCertPage() {
  const appHydrated = useHasHydrated();
  const sessionHydrated = useSessionHydrated();
  const { data, isFetching } = useCertificationStatus();
  const sendMutation = useSendCertificationEmail();
  const verifyMutation = useVerifyCertification();

  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = useMemo(
    () => resolveFrom(location.state, '/home'),
    [location.state],
  );
  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      void navigate(-1);
      return;
    }
    void navigate('/login', { replace: true });
  }, [navigate]);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!data?.isVerified) return;
    void navigate(redirectPath, { replace: true });
  }, [data?.isVerified, navigate, redirectPath]);

  useEffect(() => {
    if (!cooldown) return;
    const id = window.setInterval(() => {
      setCooldown((current) => Math.max(current - 1, 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldown]);

  const canSend =
    isValidEmailFormat(email) && cooldown === 0 && !sendMutation.isPending;
  const canVerify =
    isValidEmailFormat(email) && isValidCode(code) && !verifyMutation.isPending;

  const extractServerMessage = (error: unknown) => {
    if (!isAxiosError(error)) return null;
    const payload = error.response?.data as unknown;
    if (typeof payload !== 'object' || payload === null) return null;
    const maybeError = (payload as { error?: { message?: unknown } }).error;
    return typeof maybeError?.message === 'string' ? maybeError.message : null;
  };

  const handleSend = useCallback(async () => {
    const { localPart } = parseSchoolEmail(email);
    if (!localPart) {
      notify.warning('학교 이메일을 정확히 입력해 주세요.');
      return;
    }

    try {
      await sendMutation.mutateAsync(localPart);
      setCooldown(COOLDOWN_SECONDS);
      notify.success('인증 코드가 전송됐어요. 받은 메일함을 확인해 주세요.');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 429) {
        setCooldown(COOLDOWN_SECONDS);
        notify.warning('요청이 잦아요. 잠시 후 다시 시도해 주세요.');
        return;
      }

      const serverMessage = extractServerMessage(error);
      notify.error(
        serverMessage ?? '코드 전송에 실패했어요. 네트워크를 확인해 주세요.',
      );
    }
  }, [email, sendMutation]);

  const handleVerify = useCallback(async () => {
    const { localPart } = parseSchoolEmail(email);
    if (!localPart) {
      notify.warning('학교 이메일을 정확히 입력해 주세요.');
      return;
    }

    try {
      await verifyMutation.mutateAsync({ localPart, code });
      notify.success('이메일 인증이 완료됐어요.');
      void navigate(redirectPath);
    } catch (error) {
      const serverMessage = extractServerMessage(error);
      if (serverMessage) {
        notify.error(serverMessage);
        return;
      }
      notify.error('인증에 실패했어요. 코드와 이메일을 다시 확인해 주세요.');
    }
  }, [code, email, navigate, redirectPath, verifyMutation]);

  if (!appHydrated || !sessionHydrated || isFetching) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="email-cert-page">
      <S.TitleBarWrapper>
        <OriginTitleBar title="학교 이메일 인증" onBack={handleBack} />
      </S.TitleBarWrapper>
      <S.Card>
        <S.Heading>학교 이메일 인증</S.Heading>
        <S.Description>
          학교 이메일(<strong>@pusan.ac.kr</strong>)로 본인 인증을 진행해
          주세요. 인증을 완료하면 계속 이용할 수 있습니다.
        </S.Description>

        <S.Field>
          <S.Label htmlFor="cert-email">학교 이메일 주소</S.Label>
          <S.Input
            id="cert-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="예: student@pusan.ac.kr"
            aria-invalid={Boolean(email) && !isValidEmailFormat(email)}
            aria-describedby="email-hint"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
          />
          <S.Hint id="email-hint">학교 이메일 형식을 입력해 주세요.</S.Hint>
        </S.Field>

        <S.Field>
          <S.Label htmlFor="cert-code">인증 코드 6자리</S.Label>
          <S.Row>
            <S.Input
              id="cert-code"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              inputMode="numeric"
              placeholder="6자리"
              aria-invalid={Boolean(code) && !isValidCode(code)}
            />
            <S.Primary
              type="button"
              onClick={() => {
                void handleSend();
              }}
              disabled={!canSend}
              aria-label="send-cert-code"
            >
              {cooldown > 0
                ? `재전송 대기 (${formatMMSS(cooldown)})`
                : '인증 코드 받기'}
            </S.Primary>
          </S.Row>
          <S.Notice>이메일로 전송된 6자리 인증 코드를 입력해 주세요.</S.Notice>
        </S.Field>

        <S.Row>
          <S.Secondary
            type="button"
            onClick={handleBack}
            aria-label="email-cert-go-back"
          >
            나중에 하기
          </S.Secondary>
          <S.Primary
            type="button"
            onClick={() => {
              void handleVerify();
            }}
            disabled={!canVerify}
            aria-label="submit-certification"
          >
            인증 완료
          </S.Primary>
        </S.Row>
      </S.Card>
    </S.Page>
  );
}
