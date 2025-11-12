import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 페이지 컨테이너
 */
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.background.default};
`;

/**
 * 폼 컨테이너
 */
export const FormContainer = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${spacing.spacing6} ${spacing.spacing4};
  gap: ${spacing.spacing6};
  overflow-y: auto;
`;

/**
 * 필드 그룹
 */
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
`;

/**
 * 필드 라벨
 */
export const FieldLabel = styled.label`
  ${typography.body1Bold};
  color: ${colors.text.default};
  display: flex;
  align-items: center;
  gap: ${spacing.spacing1};
`;

/**
 * 필수 표시
 */
export const RequiredMark = styled.span`
  color: ${colors.status.critical};
`;

/**
 * 텍스트 영역 (설명 입력)
 */
export const TextArea = styled.textarea`
  ${typography.body2Regular};
  width: 100%;
  min-height: 120px;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border: 1px solid ${colors.border.default};
  border-radius: 12px;
  background-color: ${colors.background.default};
  color: ${colors.text.default};
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${colors.text.placeholder};
  }

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
 * 버튼 컨테이너
 */
export const ButtonContainer = styled.div`
  padding: ${spacing.spacing4};
  background-color: ${colors.background.default};
  border-top: 1px solid ${colors.border.default};
`;

/**
 * 에러 메시지
 */
export const ErrorMessage = styled.div`
  ${typography.label2Regular};
  color: ${colors.status.critical};
  padding: ${spacing.spacing2} ${spacing.spacing3};
  background: ${colors.status.criticalBackground};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
`;

/**
 * 헬퍼 텍스트
 */
export const HelperText = styled.div`
  ${typography.label2Regular};
  color: ${colors.text.sub};
  padding: ${spacing.spacing1} ${spacing.spacing2};
`;

/**
 * 드롭다운 래퍼 (전체 너비 사용 - DateTimePicker와 동일)
 */
export const DropdownWrapper = styled.div`
  width: 100%;

  /* 드롭다운 내부 요소들이 전체 너비를 사용하도록 */
  > * {
    width: 100%;
  }
`;
