import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * DateTimePicker 컨테이너
 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  width: 100%;
`;

/**
 * 입력 필드 (읽기 전용, 클릭하면 모달 열림)
 */
export const InputField = styled.div<{ hasValue: boolean; disabled?: boolean }>`
  ${typography.body2Regular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border: 1px solid ${colors.border.default};
  border-radius: 12px;
  background-color: ${({ disabled }) =>
    disabled ? colors.background.disabled : colors.background.default};
  color: ${({ hasValue }) =>
    hasValue ? colors.text.default : colors.text.placeholder};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      `
      border-color: ${colors.blue[500]};
      background-color: ${colors.blue[0]};
    `}
  }

  &:active {
    ${({ disabled }) =>
      !disabled &&
      `
      border-color: ${colors.blue[600]};
    `}
  }
`;

/**
 * 아이콘 영역
 */
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${colors.gray[600]};
  font-size: 20px;
`;

/**
 * 모달 오버레이 (배경)
 */
export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(42, 48, 56, 0.6);
  backdrop-filter: blur(4px);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: ${spacing.spacing4};
`;

/**
 * 모달 컨텐츠
 */
export const ModalContent = styled.div`
  background: ${colors.background.default};
  border-radius: 20px;
  padding: ${spacing.spacing6};
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing5};
`;

/**
 * 모달 헤더
 */
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/**
 * 모달 타이틀
 */
export const ModalTitle = styled.h3`
  ${typography.title1Bold};
  color: ${colors.text.default};
  margin: 0;
`;

/**
 * 닫기 버튼
 */
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${colors.gray[700]};
  font-size: 24px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.gray[100]};
    color: ${colors.gray[900]};
  }

  &:active {
    background: ${colors.gray[200]};
  }
`;

/**
 * 섹션 (날짜 선택, 시간 선택 등)
 */
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing3};
`;

/**
 * 섹션 라벨
 */
export const SectionLabel = styled.label`
  ${typography.body1Bold};
  color: ${colors.text.default};
`;

/**
 * 캘린더 그리드
 */
export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${spacing.spacing1};
`;

/**
 * 캘린더 헤더 (요일)
 */
export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${spacing.spacing1};
  margin-bottom: ${spacing.spacing2};
`;

/**
 * 요일 셀
 */
export const WeekdayCell = styled.div`
  ${typography.label2Bold};
  color: ${colors.gray[700]};
  text-align: center;
  padding: ${spacing.spacing2};
`;

/**
 * 날짜 셀
 */
export const DateCell = styled.button<{
  isSelected: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isOtherMonth: boolean;
}>`
  ${typography.body2Regular};
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  background: ${({ isSelected }) =>
    isSelected ? colors.blue[600] : 'transparent'};
  color: ${({ isSelected, isDisabled, isOtherMonth }) =>
    isDisabled
      ? colors.gray[400]
      : isSelected
        ? colors.gray[0]
        : isOtherMonth
          ? colors.gray[500]
          : colors.text.default};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  position: relative;
  font-weight: ${({ isToday }) => (isToday ? '600' : '400')};

  ${({ isToday, isSelected }) =>
    isToday &&
    !isSelected &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${colors.blue[600]};
    }
  `}

  &:hover {
    ${({ isDisabled, isSelected }) =>
      !isDisabled &&
      !isSelected &&
      `
      background: ${colors.blue[100]};
      color: ${colors.blue[700]};
    `}
  }

  &:active {
    ${({ isDisabled }) => !isDisabled && `transform: scale(0.95);`}
  }
`;

/**
 * 월/년도 네비게이션
 */
export const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.spacing4};
`;

/**
 * 월/년도 표시
 */
export const MonthDisplay = styled.div`
  ${typography.body1Bold};
  color: ${colors.text.default};
`;

/**
 * 네비게이션 버튼
 */
export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: ${colors.gray[700]};
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.gray[100]};
    color: ${colors.gray[900]};
  }

  &:active {
    background: ${colors.gray[200]};
    transform: scale(0.95);
  }
`;

/**
 * 시간 선택 영역
 */
export const TimeSelectContainer = styled.div`
  display: flex;
  gap: ${spacing.spacing3};
  align-items: center;
`;

/**
 * 시간 드롭다운
 */
export const TimeSelect = styled.select`
  ${typography.body2Regular};
  flex: 1;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border: 1px solid ${colors.border.default};
  border-radius: 12px;
  background-color: ${colors.background.default};
  color: ${colors.text.default};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.blue[500]};
    background-color: ${colors.blue[0]};
  }

  &:focus {
    outline: none;
    border-color: ${colors.blue[600]};
    box-shadow: 0 0 0 3px ${colors.blue[100]};
  }
`;

/**
 * 구분자 (시:분)
 */
export const TimeSeparator = styled.span`
  ${typography.body1Bold};
  color: ${colors.gray[700]};
`;

/**
 * 액션 버튼 영역
 */
export const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.spacing3};
  margin-top: ${spacing.spacing2};
`;

/**
 * 버튼
 */
export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  ${typography.body2Bold};
  flex: 1;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = 'secondary' }) =>
    variant === 'primary'
      ? `
    background: ${colors.blue[600]};
    color: ${colors.gray[0]};
    
    &:hover {
      background: ${colors.blue[700]};
    }
    
    &:active {
      background: ${colors.blue[800]};
      transform: scale(0.98);
    }
  `
      : `
    background: ${colors.gray[200]};
    color: ${colors.text.default};
    
    &:hover {
      background: ${colors.gray[300]};
    }
    
    &:active {
      background: ${colors.gray[400]};
      transform: scale(0.98);
    }
  `}
`;
