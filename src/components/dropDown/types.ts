/**
 * DropDown 관련 TypeScript 타입 정의
 */

/**
 * 선택 모드 타입
 */
export type SelectionMode = 'single' | 'multiple';

/**
 * 드롭다운 옵션 아이템
 */
export interface DropDownOption {
  /** 옵션의 고유 값 */
  value: string;
  /** 화면에 표시될 라벨 */
  label: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 드롭다운 설정 객체
 */
export interface DropDownConfig {
  /** 드롭다운 라벨 */
  label: string;
  /** 선택 모드 */
  selectionMode: SelectionMode;
  /** 옵션 목록 */
  options: DropDownOption[];
  /** InputPlace 전환 지원 여부 */
  hasInputOption?: boolean;
}

/**
 * 기본 DropDown 컴포넌트 Props
 */
export interface DropDownProps {
  /** 드롭다운 설정 */
  config: DropDownConfig;
  /** 선택 변경 콜백 */
  onChange?: (selected: string | string[]) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 초기 선택 값 */
  initialSelected?: string | string[];
}

/**
 * Hook 관련 타입들
 */
export interface UseDropDownConfig {
  config: DropDownConfig;
  onChange?: (selected: string | string[]) => void;
  initialSelected?: string | string[];
}

export interface UseDropDownReturn {
  /** 드롭다운 열림 상태 */
  isOpen: boolean;
  /** 선택된 항목들 */
  selectedItems: string[];
  /** 드롭다운 토글 함수 */
  toggleDropdown: () => void;
  /** 옵션 선택 함수 */
  selectOption: (value: string) => void;
  /** 선택 초기화 함수 */
  clearSelection: () => void;
  /** 드롭다운 닫기 함수 */
  closeDropdown: () => void;
  /** 드롭다운 컨테이너 ref */
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * 프리셋 컴포넌트 Props 타입들
 */
export interface SportsDropDownProps {
  /** 선택 변경 콜백 */
  onChange?: (selected: string) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface TimeSlotDropDownProps {
  /** 선택 변경 콜백 */
  onChange?: (selected: string[]) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface LocationDropDownProps {
  /** 선택 변경 콜백 */
  onChange?: (selected: string) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}
