import { zodResolver } from '@form-kit/hookform-resolvers/zod-lite';
import { useForm } from '@form-kit/react-hook-form-lite';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  type KeyboardEvent,
} from 'react';

import TextField from '@/components/form/TextField';
import {
  DEFAULT_PROFILE_IMAGE_URL,
  DEFAULT_PROFILE_NAME,
} from '@/features/profile/constants';
import ImageUploader from '@/features/upload/components/ImageUploader';
import { useAutoFocusError } from '@/libs/a11y/formA11y';
import {
  profileFormSchema,
  type ProfileFormValues,
} from '@/libs/validation/zodSchemas';

import * as S from './ProfileForm.styled';

const fieldOrder: Array<keyof ProfileFormValues> = [
  'nickname',
  'email',
  'description',
  'imageUrl',
];

const baseValues: ProfileFormValues = {
  nickname: DEFAULT_PROFILE_NAME,
  email: '',
  description: '',
  imageUrl: DEFAULT_PROFILE_IMAGE_URL,
};

const deriveInitialValues = (
  values?: ProfileFormValues | null,
): ProfileFormValues => {
  if (!values) {
    return { ...baseValues };
  }

  return {
    nickname: values.nickname?.trim() || DEFAULT_PROFILE_NAME,
    email: values.email ?? baseValues.email,
    description: values.description ?? baseValues.description,
    imageUrl: values.imageUrl?.trim() || DEFAULT_PROFILE_IMAGE_URL,
  };
};

export type ProfileFormProps = {
  initialValues?: ProfileFormValues | null;
  onSubmit: (values: ProfileFormValues) => Promise<void> | void;
  submitting?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  onChange?: (values: ProfileFormValues) => void;
  onImageUploaded?: (imageUrl: string) => Promise<void> | void;
  emailFieldHint?: string;
  onEmailFieldClick?: () => void;
  emailFieldInteractive?: boolean;
};

export default function ProfileForm({
  initialValues,
  onSubmit,
  submitting = false,
  onCancel,
  submitLabel = '저장',
  cancelLabel = '취소',
  onChange,
  onImageUploaded,
  emailFieldHint,
  onEmailFieldClick,
  emailFieldInteractive = false,
}: ProfileFormProps) {
  const memoizedInitial = useMemo(
    () => deriveInitialValues(initialValues),
    [initialValues],
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onBlur',
    defaultValues: memoizedInitial,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    reset(memoizedInitial);
  }, [memoizedInitial, reset]);

  useEffect(() => {
    if (!onChange) return;
    onChange(memoizedInitial);
  }, [memoizedInitial, onChange]);

  useEffect(() => {
    if (!onChange) return;
    const subscription = form.watch((value) => {
      onChange(value);
    });
    if (
      subscription &&
      typeof subscription === 'object' &&
      'unsubscribe' in subscription
    ) {
      return () => subscription.unsubscribe();
    }
    return undefined;
  }, [form, onChange]);

  useAutoFocusError(errors, fieldOrder);

  const busy = submitting || isSubmitting;
  const directUploadId = useId();
  const imageUrlValue = form.watch('imageUrl');
  const normalizedImageUrl = imageUrlValue ?? '';
  const trimmedImageUrl = normalizedImageUrl.trim();
  const emailHint = emailFieldHint ?? '학교 인증된 이메일';
  const emailClickable = emailFieldInteractive && !busy;

  const handleImageUploaded = useCallback(
    (url: string) => {
      const trimmed = url.trim();
      if (!trimmed) return;

      setValue('imageUrl', trimmed, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      void onImageUploaded?.(trimmed);
    },
    [onImageUploaded, setValue],
  );

  const handleClearImageUrl = useCallback(() => {
    setValue('imageUrl', '');
  }, [setValue]);

  const handleEmailKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!onEmailFieldClick) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      onEmailFieldClick();
    },
    [onEmailFieldClick],
  );

  const handleCancel = () => {
    reset(memoizedInitial);
    onCancel?.();
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <S.SectionLabel>기본 정보</S.SectionLabel>
        <S.Helper>닉네임과 소개는 활동 전반에 보여집니다.</S.Helper>
      </div>

      <S.Fields>
        <TextField
          name="nickname"
          label="닉네임"
          hint="31자 이내"
          register={register('nickname')}
          errors={errors}
          disabled={busy}
          autoComplete="nickname"
        />

        <TextField
          name="email"
          label="이메일"
          hint={emailHint}
          register={register('email')}
          errors={errors}
          type="email"
          readOnly
          disabled={busy}
          clickable={emailClickable}
          onContainerClick={emailClickable ? onEmailFieldClick : undefined}
          onInputKeyDown={emailClickable ? handleEmailKeyDown : undefined}
        />

        <TextField
          name="description"
          label="소개"
          hint="최대 255자"
          register={register('description')}
          errors={errors}
          as="textarea"
          disabled={busy}
        />

        <TextField
          name="imageUrl"
          label="프로필 이미지 URL"
          hint="이미지 주소를 입력해 주세요."
          register={register('imageUrl')}
          errors={errors}
          type="url"
          disabled={busy}
          autoComplete="off"
          suffix={
            trimmedImageUrl ? (
              <S.ImageUrlClearButton
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClearImageUrl();
                }}
                aria-label="프로필 이미지 URL 지우기"
              >
                ✕
              </S.ImageUrlClearButton>
            ) : undefined
          }
        />

        <S.DirectUploadCard
          role="group"
          aria-labelledby={`${directUploadId}-title`}
          aria-describedby={`${directUploadId}-description`}
        >
          <S.DirectUploadContent>
            <S.DirectUploadHeader>
              <S.DirectUploadTitle id={`${directUploadId}-title`}>
                직접 업로드
              </S.DirectUploadTitle>
              <S.DirectUploadDescription id={`${directUploadId}-description`}>
                로컬에서 이미지를 선택하면 URL이 자동으로 입력되고 즉시 저장을
                시도해요.
              </S.DirectUploadDescription>
            </S.DirectUploadHeader>

            <ImageUploader
              label="프로필 이미지 업로드"
              description="10MB 이하 · JPG/PNG/WEBP 지원"
              onUploaded={(nextUrl) => {
                void handleImageUploaded(nextUrl);
              }}
            />

            <S.DirectUploadHint>
              이미지 외 다른 정보도 수정했다면 저장 버튼으로 한 번에 업데이트할
              수 있어요.
            </S.DirectUploadHint>
          </S.DirectUploadContent>
        </S.DirectUploadCard>
      </S.Fields>

      <S.Actions>
        {onCancel && (
          <S.SecondaryButton
            type="button"
            onClick={handleCancel}
            disabled={busy}
          >
            {cancelLabel}
          </S.SecondaryButton>
        )}
        <S.SubmitButton type="submit" disabled={!isDirty || busy}>
          {submitLabel}
        </S.SubmitButton>
      </S.Actions>
    </S.Form>
  );
}
