/**
 * DropDown Preset 컴포넌트들
 *
 * 구현 예정:
 *
 * 1. TimeSlotDropDown (시간대 선택 - 다중 선택)
 *    - DROPDOWN_CONFIG.timeSlot 사용
 *    - 다중 선택된 시간대들을 문자열 배열로 반환
 *    - 사용 예시: 매치 생성 시 가능한 시간대들 선택
 *
 * 2. SportsDropDown (종목 선택 - 단일 선택)
 *    - DROPDOWN_CONFIG.sports 사용
 *    - 선택된 종목을 문자열로 반환
 *    - 사용 예시: 매치 생성 시 종목 선택
 *
 * 3. LocationDropDown (장소 선택 - 단일 선택, InputPlace 지원)
 *    - DROPDOWN_CONFIG.location 사용
 *    - DropDownPlusText 컴포넌트 내부 사용
 *    - 선택된 장소 또는 직접 입력한 장소를 문자열로 반환
 *    - 사용 예시: 매치 생성 시 장소 선택/입력
 *
 * 각 Preset의 공통 특징:
 * - 간단한 Props 인터페이스
 * - 설정 객체 기반으로 내부 복잡성 숨김
 * - onChange 콜백으로 선택된 값 전달
 * - 타입 안전성 보장
 *
 * 사용 예시:
 * <TimeSlotDropDown onChange={(timeSlots) => setSelectedTimes(timeSlots)} />
 * <SportsDropDown onChange={(sport) => setSelectedSport(sport)} />
 * <LocationDropDown onChange={(location) => setSelectedLocation(location)} />
 */

// TODO: TimeSlotDropDown 프리셋 구현
// TODO: SportsDropDown 프리셋 구현
// TODO: LocationDropDown 프리셋 구현
// TODO: 각 프리셋별 Props 타입 정의
// TODO: 설정 객체와 연동
