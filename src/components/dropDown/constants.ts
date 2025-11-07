/**
 * DropDown 설정 객체 및 상수 정의
 */

import type { DropDownConfig, DropDownOption } from './types';

/**
 * 스포츠 옵션 목록
 */
export const SPORTS_OPTIONS: DropDownOption[] = [
  { value: 'basketball', label: '농구' },
  { value: 'futsal', label: '풋살' },
] as const;

/**
 * 시간대 옵션 목록
 */
export const TIME_SLOT_OPTIONS: DropDownOption[] = [
  { value: '06:00-09:00', label: '06:00-09:00' },
  { value: '09:00-12:00', label: '09:00-12:00' },
  { value: '12:00-15:00', label: '12:00-15:00' },
  { value: '15:00-18:00', label: '15:00-18:00' },
  { value: '18:00-21:00', label: '18:00-21:00' },
  { value: '21:00-00:00', label: '21:00-00:00' },
] as const;

/**
 * 장소 옵션 목록
 */
export const LOCATION_OPTIONS: DropDownOption[] = [
  { value: '넉넉한 터', label: '넉넉한 터' },
  {
    value: '온천천 (부산대 ~ 장전역 사이)',
    label: '온천천 (부산대 ~ 장전역 사이)',
  },
  { value: '금정초', label: '금정초' },
  { value: '기타', label: '기타' },
] as const;

/**
 * 정렬 기준 옵션 목록
 */
export const SORT_OPTIONS: DropDownOption[] = [
  { value: 'deadline', label: '마감 시간 순' },
  { value: 'startTime', label: '운동 시간 순' },
  { value: 'remainingSlots', label: '남은 인원 순' },
] as const;

/**
 * 인원 수 옵션 목록 (2~30명)
 */
export const PLAYER_COUNT_OPTIONS: DropDownOption[] = Array.from(
  { length: 29 },
  (_, i) => ({
    value: String(i + 2),
    label: `${i + 2}명`,
  }),
);

/**
 * 드롭다운 설정 객체 (matchCard의 BUTTON_CONFIG와 같은 패턴)
 */
export const DROPDOWN_CONFIG = {
  sports: {
    label: '종목 선택',
    selectionMode: 'single',
    options: SPORTS_OPTIONS,
    hasInputOption: false,
  },
  timeSlot: {
    label: '시간대 선택',
    selectionMode: 'multiple',
    options: TIME_SLOT_OPTIONS,
    hasInputOption: false,
  },
  location: {
    label: '장소 선택',
    selectionMode: 'single',
    options: LOCATION_OPTIONS,
    hasInputOption: true, // '기타' 선택 시 InputPlace로 전환
  },
  sort: {
    label: '정렬 기준',
    selectionMode: 'single',
    options: SORT_OPTIONS,
    hasInputOption: false,
  },
  playerCount: {
    label: '인원 수 선택',
    selectionMode: 'single',
    options: PLAYER_COUNT_OPTIONS,
    hasInputOption: false,
  },
} as const satisfies Record<string, DropDownConfig>;

/**
 * 드롭다운 아이콘 상수들
 */
export const DROPDOWN_ICONS = {
  EXPAND: '▼',
  COLLAPSE: '▲',
  BACK: '←',
  CLEAR: '✕',
  REFRESH: '↻',
} as const;
