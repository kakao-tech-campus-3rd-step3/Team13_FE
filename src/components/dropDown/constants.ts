/**
 * DropDown 설정 객체 및 상수 정의
 */

import type { DropDownConfig, DropDownOption } from './types';

/**
 * 스포츠 옵션 목록
 */
export const SPORTS_OPTIONS: DropDownOption[] = [
  { value: 'futsal', label: '풋살' },
  { value: 'basketball', label: '농구' },
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
  { value: 'wide_field', label: '넓직한 터' },
  { value: 'oncheoncheon', label: '온천천 (부산대 ~ 장전역 사이)' },
  { value: 'geumjeong_elementary', label: '금정초' },
  { value: 'others', label: '기타' },
] as const;

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
