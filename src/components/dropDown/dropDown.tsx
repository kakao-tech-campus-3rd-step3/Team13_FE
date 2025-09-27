/**
 * 기본 DropDown 컴포넌트
 */

import React from 'react';

import { DROPDOWN_ICONS } from './constants';
import {
  DropDownContainer,
  DropDownHeader,
  HeaderLabel,
  ToggleIcon,
  DropDownList,
  DropDownOption,
  SelectionIndicator,
  OptionLabel,
} from './dropDown.styled';
import type { DropDownProps } from './types';
import { useDropDown } from './useDropDown';

export const DropDown: React.FC<DropDownProps> = ({
  config,
  onChange,
  className,
  disabled = false,
  initialSelected = [],
}) => {
  const { isOpen, selectedItems, toggleDropdown, selectOption, dropdownRef } =
    useDropDown({
      config,
      onChange,
      initialSelected,
    });

  // 선택된 항목들의 텍스트 생성
  const getDisplayText = () => {
    if (selectedItems.length === 0) {
      return config.label; // 선택되지 않은 경우 기본 라벨
    }

    if (config.selectionMode === 'single') {
      // 단일 선택: 선택된 항목의 라벨 표시
      const selectedOption = config.options.find(
        (option) => option.value === selectedItems[0],
      );
      return selectedOption?.label || config.label;
    } else {
      // 다중 선택: 선택된 항목들을 쉼표로 구분하여 표시
      const selectedLabels = selectedItems
        .map(
          (value) =>
            config.options.find((option) => option.value === value)?.label,
        )
        .filter(Boolean);

      if (selectedLabels.length === 0) {
        return config.label;
      }

      // TODO: 고급 텍스트 오버플로우 처리 구현
      // 현재는 단순 join, 추후 CSS 기반 ellipsis와 조합하여
      // "06:00-09:00, 09:00-12:00" -> "06:00-09:00, 09:00-..." 형태로 처리
      return selectedLabels.join(', ');
    }
  };

  return (
    <DropDownContainer ref={dropdownRef} className={className}>
      <DropDownHeader
        onClick={toggleDropdown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <HeaderLabel>{getDisplayText()}</HeaderLabel>
        <ToggleIcon isOpen={isOpen}>
          {isOpen ? DROPDOWN_ICONS.COLLAPSE : DROPDOWN_ICONS.EXPAND}
        </ToggleIcon>
      </DropDownHeader>

      <DropDownList isOpen={isOpen} role="listbox">
        {config.options.map((option) => {
          const isSelected = selectedItems.includes(option.value);

          return (
            <DropDownOption
              key={option.value}
              isSelected={isSelected}
              disabled={option.disabled}
              onClick={() => !option.disabled && selectOption(option.value)}
              role="option"
              aria-selected={isSelected}
            >
              <SelectionIndicator
                selectionMode={config.selectionMode}
                isSelected={isSelected}
              />
              <OptionLabel>{option.label}</OptionLabel>
            </DropDownOption>
          );
        })}
      </DropDownList>
    </DropDownContainer>
  );
};
