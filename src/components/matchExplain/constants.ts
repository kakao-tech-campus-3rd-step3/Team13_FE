import type { SportType } from './matchExplain.types';

/**
 * 스포츠 타입별 한글명 매핑
 */
export const SPORT_LABELS: Record<SportType, string> = {
  futsal: '풋살',
  basketball: '농구',
} as const;

/**
 * 스포츠 타입별 SVG 아이콘 경로
 */
export const SPORT_ICONS: Record<SportType, string> = {
  futsal: '/svg/futsal.svg',
  basketball: '/svg/basketball.svg',
} as const;

/**
 * ISO 8601 시간과 지속 시간(분)을 받아서 시간 범위 문자열 반환
 * @param startTime - ISO 8601 형식 문자열 (예: "2026-09-20T14:00:00")
 * @param duration - 분 단위 지속 시간 (예: 120)
 * @returns 포맷된 시간 범위 문자열 (예: "2025년 08월 09일 20:00 ~ 22:00")
 */
export const formatTimeRange = (
  startTime: string,
  duration: number,
): string => {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60 * 1000);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');
  const startHour = String(start.getHours()).padStart(2, '0');
  const startMinute = String(start.getMinutes()).padStart(2, '0');
  const endHour = String(end.getHours()).padStart(2, '0');
  const endMinute = String(end.getMinutes()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${startHour}:${startMinute} ~ ${endHour}:${endMinute}`;
};

/**
 * ISO 8601 마감 시간을 포맷된 문자열로 변환
 * @param deadline - ISO 8601 형식 문자열 (예: "2026-09-20T23:59:00")
 * @returns 포맷된 마감 시간 문자열 (예: "08월 09일 23:59")
 */
export const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${month}월 ${day}일 ${hour}:${minute}`;
};

/**
 * 모집 상태 확인 함수
 * @param deadline - 지원 마감 시간 (ISO 8601)
 * @param currentPeople - 현재 인원
 * @param maxPeople - 제한 인원
 * @returns 모집 중 여부 (true: 모집 중, false: 모집 완료)
 */
export const isRecruitmentOpen = (
  deadline: string,
  currentPeople: number,
  maxPeople: number,
): boolean => {
  const now = new Date();
  const deadlineDate = new Date(deadline);

  // 현재인원 < 제한인원 && 현재시간 < 마감시간
  return currentPeople < maxPeople && now < deadlineDate;
};
