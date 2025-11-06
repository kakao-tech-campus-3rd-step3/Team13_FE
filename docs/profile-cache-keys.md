# Profile Cache Keys & Invalidation

## Keys

- `PROFILE_QUERY_ROOT = ['profile']`
- `PROFILE_ME_KEY = ['profile', 'me']`

## Invalidation

- 프로필 정보 수정 성공/실패와 관계없이 `onSettled` 단계에서 `invalidate(PROFILE_ME_KEY)`를 호출해 서버 상태를 재검증합니다.
- 성공 시에는 곧바로 `setQueryData(PROFILE_ME_KEY, server)`로 최신 응답을 반영해 UI와 캐시의 일관성을 보장합니다.

## Staleness Strategy

- `staleTime = 60s` : 모바일 환경에서 뒤로가기/재진입 시 불필요한 네트워크 요청을 줄이고 즉시 응답성을 확보합니다.
- `gcTime = 5m` : 사용자가 페이지를 떠난 뒤에도 짧은 시간 동안 캐시를 보존해 재방문 경험을 개선합니다.
- `refetchOnWindowFocus = false` : 온보딩 · 마이페이지 플로우에서 불필요한 포커스 리패치를 방지합니다.

## Optimistic Update Pattern

1. `cancelQueries(PROFILE_ME_KEY)`로 진행 중인 요청을 중단합니다.
2. 직전 스냅샷을 보관하고 `setQueryData`로 낙관적 상태를 구성합니다.
3. 실패 시 스냅샷과 Zustand `user` 스토어를 모두 롤백한 뒤 오류 토스트를 노출합니다.
4. 성공 시 서버 응답을 캐시에 반영하고 `notify.success`로 피드백을 제공합니다.
5. 마지막으로 `invalidate`를 호출해 서버와의 정합성을 확정합니다.

## Store Synchronization

- `useProfileQuery`는 성공 시 `appStore.setUser`를 호출해 내비게이션/헤더 등 공용 UI에 즉시 반영합니다.
- `useUpdateProfile`는 낙관적 단계에서 스토어까지 함께 갱신해 업로더·마이페이지 카드 등 다른 컴포넌트도 동시에 업데이트됩니다.
