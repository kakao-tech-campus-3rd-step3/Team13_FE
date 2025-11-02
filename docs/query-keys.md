# Query Keys (React Query)

## Sports

- **Key**: `['sports']`
- **Scope**: 스포츠 전체 목록
- **staleTime**: 10분
- **refetchOnWindowFocus**: false

## Games

- **Key**: `['games', { sportId, timePeriod }]`
  - `sportId`: `number|null`
  - `timePeriod`: `'MORNING'|'NOON'|'EVENING'|null` (대소문자 무시 입력 → 내부 uppercase)
- **staleTime**: 15초
- **refetchOnWindowFocus**: 'always'
- **keepPreviousData**: true

### 예시

- 전체: `['games', { sportId: null, timePeriod: null }]`
- 농구 전체: `['games', { sportId: 1, timePeriod: null }]`
- 농구 아침: `['games', { sportId: 1, timePeriod: 'MORNING' }]`
