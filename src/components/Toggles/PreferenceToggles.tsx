import {
  useActions,
  useHasHydrated,
  useNotificationsEnabled,
} from '@/stores/appStore';

import {
  SkeletonGroup,
  SkeletonLine,
  ToggleCard,
  ToggleDescription,
  ToggleInfo,
  ToggleInput,
  ToggleSection,
  ToggleTitle,
} from './PreferenceToggles.styled';

function ToggleSkeleton() {
  return (
    <ToggleSection aria-label="toggle-preferences">
      <ToggleCard>
        <ToggleInfo>
          <SkeletonGroup>
            <SkeletonLine />
            <SkeletonLine />
          </SkeletonGroup>
        </ToggleInfo>
      </ToggleCard>
    </ToggleSection>
  );
}

type ToggleItemProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  inputId: string;
};

function ToggleItem({
  title,
  description,
  checked,
  onChange,
  inputId,
}: ToggleItemProps) {
  return (
    <ToggleCard>
      <ToggleInfo>
        <ToggleTitle id={`${inputId}-label`}>{title}</ToggleTitle>
        <ToggleDescription>{description}</ToggleDescription>
      </ToggleInfo>
      <ToggleInput
        id={inputId}
        type="checkbox"
        role="switch"
        aria-labelledby={`${inputId}-label`}
        checked={checked}
        onChange={onChange}
      />
    </ToggleCard>
  );
}

export default function PreferenceToggles() {
  const hasHydrated = useHasHydrated();
  const notifications = useNotificationsEnabled();
  const { toggleNotifications } = useActions();

  if (!hasHydrated) {
    return <ToggleSkeleton />;
  }

  return (
    <ToggleSection aria-label="toggle-preferences">
      <ToggleItem
        title="알림 받기"
        description="맞춤 매치 소식과 공지사항을 가장 먼저 받아보세요."
        checked={notifications}
        onChange={toggleNotifications}
        inputId="toggle-notifications"
      />
    </ToggleSection>
  );
}
