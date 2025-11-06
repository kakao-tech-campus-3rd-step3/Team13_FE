# KAN-213 이미지 업로드 모듈 가이드

## 개요

- **목표**: 프로필 이미지 업로드에 필요한 검증, 미리보기, 업로드(취소/재시도) 경험을 통합 제공
- **구성요소**
  - `features/upload` — 타입, 유틸리티, 서비스, 훅
  - `features/upload/components/ImageUploader` — 모바일 퍼스트 UI
  - `mocks/handlers/upload` — presign, PUT 스텁
  - `tests/upload` — 유틸/컴포넌트 시나리오 테스트

## 데이터 흐름

1. 사용자가 파일을 선택하면 `useImageUpload.pick`이 실행되어 타입/용량 검증 후 미리보기 URL 생성
2. 업로드 버튼 클릭 시 `useImageUpload.upload`
   - `/api/v1/uploads/presign` 호출 → `uploadUrl`, `publicUrl`, `requiredHeaders` 획득
   - presigned URL로 `PUT` 요청 진행 (진행률 업데이트, 취소 시 AbortController)
   - 성공 시 `notify.success` 노출, `onUploaded` 콜백으로 URL 전달
3. 페이지(`MyPage`)에서는 `updateMyProfileImageUrl` 호출 후 `queryClient.invalidateQueries(['profile','me'])`로 캐시 최신화 및 `appStore` 동기화

## 제약 조건

- 허용 타입: `image/jpeg`, `image/png`, `image/webp`
- 최대 용량: 10MB (`MAX_IMAGE_SIZE`)
- 미리보기는 `createImageBitmap` → `Image` 순으로 시도, 실패 시 사용자에게 오류 토스트 노출

## 에러 코드

| 코드                    | 메시지                                                        | 설명                    |
| ----------------------- | ------------------------------------------------------------- | ----------------------- |
| `FILE_TYPE_NOT_ALLOWED` | 지원하지 않는 이미지 형식입니다.                              | 허용되지 않은 MIME 타입 |
| `FILE_TOO_LARGE`        | 10MB 이하 이미지만 업로드할 수 있어요.                        | 용량 초과               |
| `READ_FAIL`             | 이미지 미리보기를 불러오지 못했어요.                          | 미리보기 생성 실패      |
| `NETWORK`               | 업로드 중 오류가 발생했습니다. 네트워크 상태를 확인해 주세요. | presign/PUT 실패        |
| `CANCELED`              | 업로드가 취소되었어요.                                        | 사용자가 취소           |

## MSW 스텁

- `POST */api/v1/uploads/presign` — 랜덤 ID 기반 `uploadUrl`, `publicUrl` 반환
- `PUT https://uploads.example.com/put/:id` — 200 응답, 400ms 지연 (업로드 체감용)

## 테스트 시나리오 요약

- 10MB 초과 파일 거절 및 토스트 노출 확인
- 정상 업로드 플로우 (presign → PUT → success)
- 업로드 중 취소하여 상태 복원 및 정보 토스트 노출
- 유틸 상수(`ALLOWED_MIME_TYPES`, `MAX_IMAGE_SIZE`) 검증

## 운영 팁

- 실제 스토리지와 연동 시 presign 응답 스펙에 맞게 `requestImagePresign`만 교체하면 됨
- AWS S3 사용 시 `requiredHeaders`에 ACL/서명 헤더를 포함해 전달 가능
- 업로드 이후 썸네일 생성/이미지 최적화가 필요하면 `useImageUpload.pick` 이후 전처리 훅을 추가
