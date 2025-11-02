import UserHeader from '@/components/Header/UserHeader';
import PreferenceToggles from '@/components/Toggles/PreferenceToggles';
import {
  useHasHydrated,
  useIsLoggedIn,
  useNotificationsEnabled,
} from '@/stores/appStore';

import {
  GuideText,
  PageContainer,
  Section,
  SectionTitle,
  StateGrid,
  StateLabel,
  StateRow,
  StateValue,
} from './StoreDemoPage.styled';

export default function StoreDemoPage() {
  const hydrated = useHasHydrated();
  const isLoggedIn = useIsLoggedIn();
  const notifications = useNotificationsEnabled();

  return (
    <PageContainer>
      <Section>
        <SectionTitle>스토어 상태 데모</SectionTitle>
        <GuideText>
          로그인 상태와 토글 변경이 저장되는지 확인해 보세요.
        </GuideText>
      </Section>
      <UserHeader />
      <PreferenceToggles />
      <Section>
        <SectionTitle>현재 스토어 상태</SectionTitle>
        <StateGrid>
          <StateRow>
            <StateLabel>hydrated</StateLabel>
            <StateValue>{String(hydrated)}</StateValue>
          </StateRow>
          <StateRow>
            <StateLabel>isLoggedIn</StateLabel>
            <StateValue>{String(isLoggedIn)}</StateValue>
          </StateRow>
          <StateRow>
            <StateLabel>notificationsEnabled</StateLabel>
            <StateValue>{String(notifications)}</StateValue>
          </StateRow>
        </StateGrid>
        <GuideText>새로고침 후에도 값이 유지되는지 검증해 보세요.</GuideText>
      </Section>
    </PageContainer>
  );
}
