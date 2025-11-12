import type { SportType } from '@/components/matchExplain/matchExplain.types';
import type { GameResponse, SportId } from '@/types/game.types';

/**
 * ISO 날짜 문자열을 "M/D HH:mm" 형식으로 변환
 * @example "2026-09-20T14:00:00" → "9/20 14:00"
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

/**
 * ISO 날짜 문자열을 "MM/DD HH:mm" 형식으로 변환 (0 패딩)
 * @example "2026-09-20T14:00:00" → "09/20 14:00"
 */
export function formatDateTimePadded(isoString: string): string {
  const date = new Date(isoString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

/**
 * 시작 시간과 지속 시간으로 시간 범위 포맷팅
 * @example startTime: "2026-09-20T14:00:00", duration: 100 → "9/20 14:00 ~ 15:40"
 */
export function formatTimeRange(startTime: string, duration: number): string {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60 * 1000);

  const startStr = formatDateTime(startTime);
  const endHours = String(end.getHours()).padStart(2, '0');
  const endMinutes = String(end.getMinutes()).padStart(2, '0');

  return `${startStr} ~ ${endHours}:${endMinutes}`;
}

/**
 * 시작 시간에서 3시간을 뺀 마감 시간 계산
 * @example startTime: "2026-09-20T14:00:00" → "09/20 11:00"
 */
export function calculateDeadline(startTime: string): string {
  const start = new Date(startTime);
  const deadline = new Date(start.getTime() - 3 * 60 * 60 * 1000); // 3시간 전
  return formatDateTimePadded(deadline.toISOString());
}

/**
 * 인원 수를 "현재/최대" 형식으로 포맷팅
 * @example currentPlayerCount: 2, playerCount: 10 → "2/10"
 */
export function formatPeopleCount(
  currentPlayerCount: number,
  playerCount: number,
): string {
  return `${currentPlayerCount}/${playerCount}`;
}

/**
 * 정렬 기준 타입
 */
export type SortCriteria = 'deadline' | 'startTime' | 'remainingSlots';

/**
 * 게임 목록 정렬
 */
export function sortGames(
  games: GameResponse[],
  criteria: SortCriteria,
): GameResponse[] {
  const sorted = [...games];

  switch (criteria) {
    case 'deadline':
      // 마감 시간 순 (시작 시간 - 3시간)
      sorted.sort((a, b) => {
        const deadlineA = new Date(a.startTime).getTime() - 3 * 60 * 60 * 1000;
        const deadlineB = new Date(b.startTime).getTime() - 3 * 60 * 60 * 1000;
        return deadlineA - deadlineB;
      });
      break;

    case 'startTime':
      // 운동 시간 순 (시작 시간)
      sorted.sort((a, b) => {
        return (
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
      });
      break;

    case 'remainingSlots':
      // 남은 인원 순 (적은 순서대로)
      sorted.sort((a, b) => {
        const remainingA = a.playerCount - a.currentPlayerCount;
        const remainingB = b.playerCount - b.currentPlayerCount;
        return remainingA - remainingB;
      });
      break;

    default:
      break;
  }

  return sorted;
}

/**
 * 시간대로 게임 필터링
 * @param games - 게임 목록
 * @param timeSlots - 선택된 시간대 배열 (예: ["06:00-09:00", "18:00-21:00"])
 */
export function filterGamesByTimeSlots(
  games: GameResponse[],
  timeSlots: string[],
): GameResponse[] {
  if (timeSlots.length === 0) return games;

  return games.filter((game) => {
    const startTime = new Date(game.startTime);
    const hours = startTime.getHours();

    return timeSlots.some((slot) => {
      const [startStr, endStr] = slot.split('-');
      const [startHour] = startStr.split(':').map(Number);
      const [endHour] = endStr.split(':').map(Number);

      return hours >= startHour && hours < endHour;
    });
  });
}

/**
 * SportId를 SportType으로 변환
 * @param sportId - 스포츠 ID (1: 농구, 2: 풋살)
 * @returns SportType ('basketball' | 'futsal')
 */
export function convertSportIdToType(sportId: SportId): SportType {
  return sportId === 1 ? 'basketball' : 'futsal';
}

/**
 * 마감 시간을 ISO 8601 형식으로 계산 (시작 시간 - 3시간)
 * @param startTime - 시작 시간 (ISO 8601)
 * @returns 마감 시간 (ISO 8601)
 */
export function calculateDeadlineISO(startTime: string): string {
  const start = new Date(startTime);
  const deadline = new Date(start.getTime() - 3 * 60 * 60 * 1000); // 3시간 전
  return deadline.toISOString();
}
