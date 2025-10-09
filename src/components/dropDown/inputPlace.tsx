/**
 * InputPlace 컴포넌트 (장소 입력)
 */

import React, { useRef, useEffect } from 'react';

import { DROPDOWN_ICONS } from './constants';
import {
  InputContainer,
  InputHeader,
  InputField,
  InputActions,
  ActionButton,
} from './inputPlace.styled.ts';

export interface InputPlaceProps {
  /** 입력값 */
  value?: string;
  /** 입력값 변경 콜백 */
  onChange?: (value: string) => void;
  /** 뒤로가기 버튼 클릭 콜백 */
  onBackClick?: () => void;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 포커스 해제 시 콜백 */
  onBlur?: () => void;
}

export const InputPlace: React.FC<InputPlaceProps> = ({
  value = '',
  onChange,
  onBackClick,
  placeholder = '장소를 입력해주세요',
  className,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 자동 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClearClick = () => {
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleInputBlur = () => {
    onBlur?.();
  };

  return (
    <InputContainer className={className}>
      <InputHeader>
        <span>장소 입력</span>
        <InputActions>
          <ActionButton
            type="button"
            onClick={handleClearClick}
            aria-label="입력 내용 지우기"
          >
            {DROPDOWN_ICONS.CLEAR}
          </ActionButton>
          <ActionButton
            type="button"
            onClick={onBackClick}
            aria-label="드롭다운으로 돌아가기"
          >
            {DROPDOWN_ICONS.REFRESH}
          </ActionButton>
        </InputActions>
      </InputHeader>
      <InputField
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};
