import RouteSkeleton from '@/components/RouteSkeleton';
import {
  useCurrentUser,
  useEmailVerified,
  useHasHydrated,
  useSessionExpired,
} from '@/stores/appStore';

import * as S from './MyPage.styled';

export default function MyPage() {
  const hydrated = useHasHydrated();
  const user = useCurrentUser();
  const emailVerified = useEmailVerified();
  const sessionExpired = useSessionExpired();

  if (!hydrated) {
    return <RouteSkeleton />;
  }

  return (
    <S.Page aria-label="my-page">
      <S.ProfileSection>
        <S.Heading>내 계정</S.Heading>
        {user ? (
          <>
            <S.Avatar src={user.avatarUrl} alt={`${user.name} 아바타`} />
            <S.UserMeta>
              <S.UserName>{user.name}</S.UserName>
              <S.UserEmail>{user.email}</S.UserEmail>
            </S.UserMeta>
            <S.StatusList>
              <S.StatusItem>
                <S.StatusLabel>이메일 인증</S.StatusLabel>
                <S.StatusValue>
                  {emailVerified ? '완료' : '미완료'}
                </S.StatusValue>
              </S.StatusItem>
              <S.StatusItem>
                <S.StatusLabel>세션 상태</S.StatusLabel>
                <S.StatusValue>
                  {sessionExpired ? '만료됨' : '활성'}
                </S.StatusValue>
              </S.StatusItem>
            </S.StatusList>
          </>
        ) : (
          <S.EmptyState>
            사용자 정보를 찾을 수 없어요. 다시 로그인해 주세요.
          </S.EmptyState>
        )}
      </S.ProfileSection>
    </S.Page>
  );
}
