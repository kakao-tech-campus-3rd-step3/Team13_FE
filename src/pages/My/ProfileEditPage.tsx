import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type ProfileResponse, type UpdateProfileRequest } from '@/api/profile';
import RouteSkeleton from '@/components/RouteSkeleton';
import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { useUpdateProfile } from '@/hooks/mutations/profile';
import { useProfileQuery } from '@/hooks/queries/profile';
import type { ProfileFormValues } from '@/libs/validation/zodSchemas';
import { notify } from '@/pages/notifications/notify';
import { useHasHydrated } from '@/stores/appStore';

import * as S from './ProfileEditPage.styled';

const toFormValues = (profile: ProfileResponse): ProfileFormValues => ({
  nickname: profile.name,
  email: profile.email,
  description: profile.description ?? '',
  imageUrl: profile.imageUrl || undefined,
});

export default function ProfileEditPage() {
  const hasHydrated = useHasHydrated();
  const navigate = useNavigate();
  const {
    data: profile,
    isLoading,
    isError,
  } = useProfileQuery({
    enabled: hasHydrated,
  });
  const updateProfileMutation = useUpdateProfile();
  const { mutateAsync: updateProfile, isPending } = updateProfileMutation;
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [previewName, setPreviewName] = useState('');

  useEffect(() => {
    if (profile) {
      setPreviewUrl(profile.imageUrl || undefined);
      setPreviewName(profile.name);
    }
  }, [profile]);

  const initialValues = useMemo(
    () => profile && toFormValues(profile),
    [profile],
  );

  const handleNavigateBack = useCallback(() => {
    if (window.history.length > 1) {
      void navigate(-1);
    } else {
      void navigate('/my', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = useCallback(
    async (values: ProfileFormValues) => {
      if (!profile) return;

      const request: UpdateProfileRequest = {};
      const nextName = values.nickname.trim();
      const nextDescription = values.description?.toString() ?? '';
      const nextImageUrl = values.imageUrl?.trim();

      if (nextName !== profile.name) {
        request.name = nextName;
      }
      if (nextDescription !== (profile.description ?? '')) {
        request.description = nextDescription;
      }
      if ((nextImageUrl ?? '') !== (profile.imageUrl ?? '')) {
        if (typeof nextImageUrl === 'string' && nextImageUrl.length > 0) {
          request.imageUrl = nextImageUrl;
        }
      }

      if (Object.keys(request).length === 0) {
        notify.info('변경된 내용이 없어요.');
        return;
      }

      try {
        await updateProfile(request);
      } catch {
        // 훅 내부에서 토스트 및 롤백을 처리합니다.
      }
    },
    [profile, updateProfile],
  );

  const handleFormChange = useCallback((values: ProfileFormValues) => {
    setPreviewUrl(values.imageUrl || undefined);
    setPreviewName(values.nickname);
  }, []);

  const handleImageUploadedDirect = useCallback(
    async (nextUrl: string) => {
      const trimmed = nextUrl.trim();
      if (!trimmed) return;

      setPreviewUrl(trimmed);

      if (profile?.imageUrl === trimmed) {
        return;
      }

      try {
        await updateProfileMutation.mutateAsync({ imageUrl: trimmed });
      } catch {
        // 훅 내부에서 토스트 및 롤백을 처리합니다.
      }
    },
    [profile?.imageUrl, updateProfileMutation],
  );

  if (!hasHydrated) {
    return <RouteSkeleton />;
  }

  if (isLoading) {
    return <RouteSkeleton />;
  }

  if (isError || !profile) {
    return (
      <S.Page aria-label="profile-edit-error">
        <S.TitleBarWrapper>
          <OriginTitleBar title="프로필 수정" onBack={handleNavigateBack} />
        </S.TitleBarWrapper>
        <S.Card role="alert">
          <S.Header>
            <S.Title>프로필 정보를 불러오지 못했어요</S.Title>
            <S.Subtitle>잠시 후 다시 시도하거나 새로고침 해 주세요.</S.Subtitle>
          </S.Header>
        </S.Card>
      </S.Page>
    );
  }

  return (
    <S.Page aria-label="profile-edit-page">
      <S.TitleBarWrapper>
        <OriginTitleBar title="프로필 수정" onBack={handleNavigateBack} />
      </S.TitleBarWrapper>

      <S.Card>
        <S.Header>
          <S.Badge>profile</S.Badge>
          <S.Title>나만의 프로필을 완성하세요</S.Title>
          <S.Subtitle>
            닉네임과 소개는 다른 사용자에게 보여집니다. 최신 정보로 유지해
            보세요.
          </S.Subtitle>
        </S.Header>

        <S.AvatarSection>
          <S.AvatarPreview aria-label="profile-avatar-preview">
            {previewUrl ? (
              <S.AvatarImage
                src={previewUrl}
                alt={`${previewName} 아바타 미리보기`}
              />
            ) : (
              <S.AvatarFallback aria-hidden="true">
                {previewName ? previewName.charAt(0).toUpperCase() : 'P'}
              </S.AvatarFallback>
            )}
            <S.AvatarBadge>live</S.AvatarBadge>
          </S.AvatarPreview>
          <S.AvatarText>
            <S.AvatarTitle>미리보기</S.AvatarTitle>
            <S.AvatarDescription>
              프로필 이미지 URL을 변경하면 즉시 미리보기에서 확인할 수 있어요.
            </S.AvatarDescription>
          </S.AvatarText>
        </S.AvatarSection>

        <ProfileForm
          initialValues={initialValues}
          submitting={isPending}
          onSubmit={handleSubmit}
          onCancel={handleNavigateBack}
          submitLabel={isPending ? '저장 중...' : '저장'}
          cancelLabel="취소"
          onChange={handleFormChange}
          onImageUploaded={handleImageUploadedDirect}
        />
      </S.Card>
    </S.Page>
  );
}
