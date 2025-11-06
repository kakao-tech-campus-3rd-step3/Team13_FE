import { zodResolver } from '@form-kit/hookform-resolvers/zod-lite';
import { useForm } from '@form-kit/react-hook-form-lite';

import TextField from '@/components/form/TextField';
import RouteSkeleton from '@/components/RouteSkeleton';
import { useAutoFocusError } from '@/libs/a11y/formA11y';
import {
  profileFormSchema,
  type ProfileFormValues,
} from '@/libs/validation/zodSchemas';
import { notify } from '@/pages/notifications/notify';
import { useHasHydrated } from '@/stores/appStore';

import * as S from './ProfileFormDemo.styled';

export default function ProfileFormDemo() {
  const hydrated = useHasHydrated();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onBlur',
  });

  useAutoFocusError(errors, ['nickname', 'email', 'description', 'imageUrl']);

  if (!hydrated) {
    return <RouteSkeleton />;
  }

  const onSubmit = (values: ProfileFormValues) => {
    notify.success('검증 성공! 폼 데이터가 유효합니다.');

    console.log(values);
  };

  const handleReset = () => {
    (['nickname', 'email', 'description', 'imageUrl'] as const).forEach(
      (name) => {
        setValue(name, '');
      },
    );
    clearErrors();
    notify.info('입력 값이 초기화되었습니다.');
  };

  return (
    <S.Page aria-label="profile-form-demo">
      <S.Container>
        <S.Card onSubmit={handleSubmit(onSubmit)} noValidate>
          <S.Header>
            <S.Badge>profile</S.Badge>
            <S.Title>프로필 정보 업데이트</S.Title>
            <S.Subtitle>
              마이페이지와 온보딩에서 사용하는 카드 레이아웃을 그대로 적용한
              고급형 입력 경험입니다. 키보드만으로도 모든 필드를 빠르게 채울 수
              있어요.
            </S.Subtitle>
          </S.Header>

          <S.Divider />

          <S.FormGrid>
            <TextField
              name="nickname"
              label="닉네임"
              hint="31자 이내로 설정하면 추천 친구 목록에 멋지게 노출돼요."
              register={register('nickname')}
              errors={errors}
            />

            <TextField
              name="email"
              label="이메일"
              hint="알림과 로그인에 사용하는 메일 주소를 입력해 주세요."
              register={register('email')}
              errors={errors}
              type="email"
            />

            <TextField
              name="description"
              label="소개"
              hint="최대 255자 — 관심 종목이나 한 줄 소개를 남겨 보세요."
              register={register('description')}
              errors={errors}
              as="textarea"
            />

            <TextField
              name="imageUrl"
              label="프로필 이미지 URL"
              hint="https:// 로 시작하는 고화질 이미지를 권장합니다."
              register={register('imageUrl')}
              errors={errors}
              type="url"
            />
          </S.FormGrid>

          <S.Actions>
            <S.Secondary type="button" onClick={handleReset} aria-label="reset">
              초기화
            </S.Secondary>
            <S.Primary
              type="submit"
              disabled={isSubmitting}
              aria-label="submit"
            >
              저장
            </S.Primary>
          </S.Actions>
        </S.Card>

        <S.FooterNote>
          입력한 정보는 저장 시 암호화되어 안전하게 보관됩니다.
        </S.FooterNote>
      </S.Container>
    </S.Page>
  );
}
