/**
 * DateTimePicker 컴포넌트
 * 날짜 선택 모달 + 시간 드롭다운(시/분)
 */

import React, { useState, useMemo } from 'react';

import * as S from './DateTimePicker.styled';

interface DateTimePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date; // 최소 날짜 (시작 시간은 현재 이후)
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = '날짜와 시간을 선택해주세요',
  disabled = false,
  minDate,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const base = value ?? minDate ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [selectedHour, setSelectedHour] = useState<number>(
    value?.getHours() ?? 12,
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    value?.getMinutes() ?? 0,
  );

  // 오늘 날짜
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  // 표시할 날짜 문자열
  const displayValue = useMemo(() => {
    if (!value) return '';
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    const hour = String(value.getHours()).padStart(2, '0');
    const minute = String(value.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
  }, [value]);

  // 캘린더 데이터 생성
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // 이번 달 첫날과 마지막날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 첫 주의 시작일 (일요일부터)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // 마지막 주의 종료일
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [currentMonth]);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  // 날짜 선택
  const handleDateClick = (date: Date) => {
    // 날짜 비활성화 체크 (날짜만 비교, 시간 제외)
    if (minDate) {
      const dateOnly = new Date(date);
      dateOnly.setHours(0, 0, 0, 0);
      const minDateOnly = new Date(minDate);
      minDateOnly.setHours(0, 0, 0, 0);

      if (dateOnly < minDateOnly) return;
    }

    setSelectedDate(date);
  };

  // 모달 열기
  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  // 모달 닫기
  const handleClose = () => {
    setIsOpen(false);
  };

  // 확인 버튼
  const handleConfirm = () => {
    if (!selectedDate) return;

    const result = new Date(selectedDate);
    result.setHours(selectedHour, selectedMinute, 0, 0);

    // minDate 검증 (날짜 + 시간 모두 고려)
    if (minDate && result < minDate) {
      alert('선택한 시간이 최소 시간보다 이전입니다. 다시 선택해주세요.');
      return;
    }

    onChange(result);
    setIsOpen(false);
  };

  // 취소 버튼
  const handleCancel = () => {
    setSelectedDate(value ?? null);
    setSelectedHour(value?.getHours() ?? 12);
    setSelectedMinute(value?.getMinutes() ?? 0);
    setIsOpen(false);
  };

  // 날짜가 같은지 비교
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 시간 옵션 생성
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  return (
    <S.Container className={className}>
      {label && <S.SectionLabel>{label}</S.SectionLabel>}

      {/* 입력 필드 */}
      <S.InputField hasValue={!!value} disabled={disabled} onClick={handleOpen}>
        <span>{displayValue || placeholder}</span>
        <S.IconWrapper>📅</S.IconWrapper>
      </S.InputField>

      {/* 모달 */}
      <S.ModalOverlay isOpen={isOpen} onClick={handleClose}>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          {/* 헤더 */}
          <S.ModalHeader>
            <S.ModalTitle>{label || '날짜 및 시간 선택'}</S.ModalTitle>
            <S.CloseButton onClick={handleClose}>×</S.CloseButton>
          </S.ModalHeader>

          {/* 날짜 선택 */}
          <S.Section>
            <S.SectionLabel>날짜</S.SectionLabel>

            {/* 월 네비게이션 */}
            <S.MonthNavigation>
              <S.NavButton onClick={handlePrevMonth}>‹</S.NavButton>
              <S.MonthDisplay>
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </S.MonthDisplay>
              <S.NavButton onClick={handleNextMonth}>›</S.NavButton>
            </S.MonthNavigation>

            {/* 요일 헤더 */}
            <S.CalendarHeader>
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <S.WeekdayCell key={day}>{day}</S.WeekdayCell>
              ))}
            </S.CalendarHeader>

            {/* 날짜 그리드 */}
            <S.CalendarGrid>
              {calendarDays.map((date, index) => {
                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();
                const isSelected = selectedDate
                  ? isSameDate(date, selectedDate)
                  : false;
                const isToday = isSameDate(date, today);

                // 날짜 비활성화 (날짜만 비교, 시간 제외)
                let isDisabled = false;
                if (minDate) {
                  const dateOnly = new Date(date);
                  dateOnly.setHours(0, 0, 0, 0);
                  const minDateOnly = new Date(minDate);
                  minDateOnly.setHours(0, 0, 0, 0);
                  isDisabled = dateOnly < minDateOnly;
                }

                return (
                  <S.DateCell
                    key={index}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    isToday={isToday}
                    isOtherMonth={!isCurrentMonth}
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                  >
                    {date.getDate()}
                  </S.DateCell>
                );
              })}
            </S.CalendarGrid>
          </S.Section>

          {/* 시간 선택 */}
          <S.Section>
            <S.SectionLabel>시간</S.SectionLabel>
            <S.TimeSelectContainer>
              <S.TimeSelect
                value={selectedHour}
                onChange={(e) => setSelectedHour(Number(e.target.value))}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {String(hour).padStart(2, '0')}시
                  </option>
                ))}
              </S.TimeSelect>

              <S.TimeSeparator>:</S.TimeSeparator>

              <S.TimeSelect
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(Number(e.target.value))}
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {String(minute).padStart(2, '0')}분
                  </option>
                ))}
              </S.TimeSelect>
            </S.TimeSelectContainer>
          </S.Section>

          {/* 액션 버튼 */}
          <S.ActionButtons>
            <S.Button variant="secondary" onClick={handleCancel}>
              취소
            </S.Button>
            <S.Button
              variant="primary"
              onClick={handleConfirm}
              disabled={!selectedDate}
            >
              확인
            </S.Button>
          </S.ActionButtons>
        </S.ModalContent>
      </S.ModalOverlay>
    </S.Container>
  );
};
