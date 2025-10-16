/**
 * 장소 선택 드롭다운 (단일 선택)
 * "기타" 선택 시 InputPlace로 전환되는 복합 컴포넌트
 */

import React, { useState } from 'react';

import { DROPDOWN_CONFIG } from './constants';
import { DropDown } from './dropDown';
import { InputPlace } from './inputPlace';
import type { LocationDropDownWithInputProps } from './types';

export const LocationDropDown: React.FC<LocationDropDownWithInputProps> = ({
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
      // 일반 옵션 선택 시
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
      config={DROPDOWN_CONFIG.location}
      onChange={handleDropDownChange}
      className={className}
      disabled={disabled}
      initialSelected={selectedOption}
    />
  );
};
