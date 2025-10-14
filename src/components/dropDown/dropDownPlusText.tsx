/**
 * DropDownPlusText 복합 컴포넌트
 */

import React, { useState } from 'react';

import { DROPDOWN_CONFIG } from './constants';
import { DropDown } from './dropDown';
import { InputPlace } from './inputPlace';
import type { DropDownConfig } from './types';

export interface DropDownPlusTextProps {
  /** 드롭다운 설정 (location 설정 사용) */
  config?: DropDownConfig;
  /** 선택 변경 콜백 */
  onChange?: (selected: string | null) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export const DropDownPlusText: React.FC<DropDownPlusTextProps> = ({
  config = DROPDOWN_CONFIG.location,
  onChange,
  className,
  disabled = false,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  // 드롭다운에서 옵션 선택 시 처리
  const handleDropDownChange = (selected: string | string[]) => {
    const selectedValue = Array.isArray(selected) ? selected[0] : selected;

    if (selectedValue === '기타') {
      // '기타' 선택 시 입력 모드로 전환
      setShowInput(true);
      setSelectedOption('');
    } else {
      // 일반 옵션 선택 시 - 이제 value와 label이 동일하므로 그대로 전달
      setSelectedOption(selectedValue);
      setInputValue('');
      onChange?.(selectedValue);
    }
  };

  // InputPlace에서 뒤로가기 클릭 시 처리
  const handleBackClick = () => {
    setShowInput(false);
    setSelectedOption('');
    setInputValue('');
    onChange?.(null);
  };

  // InputPlace에서 입력값 변경 시 처리
  const handleInputChange = (value: string) => {
    setInputValue(value);
    // 실시간으로 상위 컴포넌트에 전달하지 않고 blur 시점에 전달
  };

  // InputPlace에서 포커스 해제 시 처리
  const handleInputBlur = () => {
    if (inputValue.trim()) {
      onChange?.(inputValue.trim());
    } else {
      onChange?.(null);
    }
  };

  // 현재 표시할 컴포넌트 결정
  if (showInput) {
    return (
      <InputPlace
        value={inputValue}
        onChange={handleInputChange}
        onBackClick={handleBackClick}
        onBlur={handleInputBlur}
        placeholder="장소를 입력해주세요"
        className={className}
      />
    );
  }

  return (
    <DropDown
      config={config}
      onChange={handleDropDownChange}
      className={className}
      disabled={disabled}
      initialSelected={selectedOption}
    />
  );
};
