import { zodResolver } from '@form-kit/hookform-resolvers/zod-lite';
import { useForm } from '@form-kit/react-hook-form-lite';
import { useEffect, useMemo } from 'react';

import TextField from '@/components/form/TextField';
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

const defaultValues: ProfileFormValues = {
  nickname: '',
  email: '',
  description: '',
  imageUrl: undefined,
};

export type ProfileFormProps = {
  initialValues?: ProfileFormValues | null;
  onSubmit: (values: ProfileFormValues) => Promise<void> | void;
  submitting?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  onChange?: (values: ProfileFormValues) => void;
};

export default function ProfileForm({
  initialValues,
  onSubmit,
  submitting = false,
  onCancel,
  submitLabel = '저장',
  cancelLabel = '취소',
  onChange,
}: ProfileFormProps) {
  const memoizedInitial = useMemo(
    () => initialValues ?? defaultValues,
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
          hint="학교 인증된 이메일"
          register={register('email')}
          errors={errors}
          type="email"
          readOnly
          disabled={busy}
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
          hint="https:// 로 시작하는 주소"
          register={register('imageUrl')}
          errors={errors}
          type="url"
          disabled={busy}
          autoComplete="off"
        />
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
