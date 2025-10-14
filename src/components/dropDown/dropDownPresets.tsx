/**
 * DropDown Preset 컴포넌트들
 */

import React from 'react';

import { DROPDOWN_CONFIG } from './constants';
import { DropDown } from './dropDown';
import type {
  DropDownConfig,
  SportsDropDownProps,
  TimeSlotDropDownProps,
  LocationDropDownProps,
} from './types';

/**
 * 공통 타입 가드 헬퍼 함수들
 */
const isSingleSelection = (selected: string | string[]): selected is string => {
  return typeof selected === 'string';
};

const isMultipleSelection = (
  selected: string | string[],
): selected is string[] => {
  return Array.isArray(selected);
};

/**
 * 타입별 onChange 핸들러를 생성하는 고차 함수
 */
const createTypedOnChangeHandler = <T extends string | string[]>(
  config: DropDownConfig,
  onChange?: (selected: T) => void,
) => {
  return (selected: string | string[]) => {
    if (!onChange) return;

    if (config.selectionMode === 'single' && isSingleSelection(selected)) {
      (onChange as (selected: string) => void)(selected);
    } else if (
      config.selectionMode === 'multiple' &&
      isMultipleSelection(selected)
    ) {
      (onChange as (selected: string[]) => void)(selected);
    }
  };
};

/**
 * 종목 선택 드롭다운 (단일 선택)
 */
export const SportsDropDown: React.FC<SportsDropDownProps> = ({
  onChange,
  className,
  disabled = false,
}) => {
  const handleChange = createTypedOnChangeHandler(
    DROPDOWN_CONFIG.sports,
    onChange,
  );

  return (
    <DropDown
      config={DROPDOWN_CONFIG.sports}
      onChange={handleChange}
      className={className}
      disabled={disabled}
    />
  );
};

/**
 * 시간대 선택 드롭다운 (다중 선택)
 */
export const TimeSlotDropDown: React.FC<TimeSlotDropDownProps> = ({
  onChange,
  className,
  disabled = false,
}) => {
  const handleChange = createTypedOnChangeHandler(
    DROPDOWN_CONFIG.timeSlot,
    onChange,
  );

  return (
    <DropDown
      config={DROPDOWN_CONFIG.timeSlot}
      onChange={handleChange}
      className={className}
      disabled={disabled}
    />
  );
};

/**
 * 장소 선택 드롭다운 (단일 선택)
 */
export const LocationDropDown: React.FC<LocationDropDownProps> = ({
  onChange,
  className,
  disabled = false,
}) => {
  const handleChange = createTypedOnChangeHandler(
    DROPDOWN_CONFIG.location,
    onChange,
  );

  return (
    <DropDown
      config={DROPDOWN_CONFIG.location}
      onChange={handleChange}
      className={className}
      disabled={disabled}
    />
  );
};
