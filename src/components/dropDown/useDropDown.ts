/**
 * DropDown 상태 관리를 위한 커스텀 Hook
 */

import { useState, useEffect, useCallback, useRef } from 'react';

import type { UseDropDownConfig, UseDropDownReturn } from './types';

export const useDropDown = ({
  config,
  onChange,
  initialSelected = [],
}: UseDropDownConfig): UseDropDownReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    Array.isArray(initialSelected)
      ? initialSelected
      : [initialSelected].filter(Boolean),
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // 드롭다운 토글
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 드롭다운 닫기
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 옵션 선택
  const selectOption = useCallback(
    (value: string) => {
      let newSelected: string[];

      if (config.selectionMode === 'single') {
        newSelected = [value];
        // 단일 선택 시 드롭다운 자동 닫기
        setIsOpen(false);
      } else {
        // 다중 선택 시 토글
        newSelected = selectedItems.includes(value)
          ? selectedItems.filter((item) => item !== value)
          : [...selectedItems, value];
      }

      setSelectedItems(newSelected);

      // 상위 컴포넌트로 콜백 호출
      if (onChange) {
        onChange(
          config.selectionMode === 'single'
            ? newSelected[0] || ''
            : newSelected,
        );
      }
    },
    [config.selectionMode, selectedItems, onChange],
  );

  // 선택 초기화
  const clearSelection = useCallback(() => {
    setSelectedItems([]);
    if (onChange) {
      onChange(config.selectionMode === 'single' ? '' : []);
    }
  }, [config.selectionMode, onChange]);

  return {
    isOpen,
    selectedItems,
    toggleDropdown,
    selectOption,
    clearSelection,
    closeDropdown,
    dropdownRef,
  };
};
