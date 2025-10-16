/**
 * DropDown Preset 컴포넌트들
 */

import React from 'react';

import { DROPDOWN_CONFIG } from './constants';
import { DropDown } from './dropDown';
import type {
  SportsDropDownProps,
  TimeSlotDropDownProps,
  LocationDropDownProps,
} from './types';

/**
 * 종목 선택 드롭다운 (단일 선택)
 */
export const SportsDropDown: React.FC<SportsDropDownProps> = ({
  onChange,
  className,
  disabled = false,
}) => {
  const handleChange = onChange
    ? (selected: string | string[]) =>
        (onChange as (selected: string) => void)(selected as string)
    : undefined;

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
  const handleChange = onChange
    ? (selected: string | string[]) =>
        (onChange as (selected: string[]) => void)(selected as string[])
    : undefined;

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
  const handleChange = onChange
    ? (selected: string | string[]) =>
        (onChange as (selected: string) => void)(selected as string)
    : undefined;

  return (
    <DropDown
      config={DROPDOWN_CONFIG.location}
      onChange={handleChange}
      className={className}
      disabled={disabled}
    />
  );
};
