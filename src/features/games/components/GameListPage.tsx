import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useGameList, type TimePeriod } from '@/hooks/queries/games';

const PERIODS: TimePeriod[] = ['MORNING', 'NOON', 'EVENING'];

export default function GameListPage() {
  const [sp, setSp] = useSearchParams();
  const location = useLocation();

  const sportId = sp.get('sportId') ? Number(sp.get('sportId')) : undefined;
  const timePeriod = sp.get('timePeriod') ?? undefined;

  const { data, isLoading, isError, refetch } = useGameList({
    sportId,
    timePeriod,
  });

  // 탑레벨 타입 import 없이, inline import로 타입 지정
  const games =
    data?.games ?? ([] as import('@/hooks/queries/games').GameResponse[]);
  const hasGames = games.length > 0;

  const onChangeSport = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(sp);
    if (e.target.value) next.set('sportId', e.target.value);
    else next.delete('sportId');
    setSp(next, { replace: false });
  };

  const onChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(sp);
    if (e.target.value) next.set('timePeriod', e.target.value.toUpperCase());
    else next.delete('timePeriod');
    setSp(next, { replace: false });
  };

  return (
    <div style={{ padding: 12 }}>
      {/* 필터 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <label>
          스포츠:
          <select
            aria-label="select-sport"
            value={sportId ?? ''}
            onChange={onChangeSport}
          >
            <option value="">전체</option>
            <option value="1">농구</option>
            <option value="2">축구</option>
          </select>
        </label>
        <label>
          시간대:
          <select
            aria-label="select-period"
            value={(timePeriod ?? '').toUpperCase()}
            onChange={onChangePeriod}
          >
            <option value="">전체</option>
            {PERIODS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => {
            void refetch();
          }}
          aria-label="refetch-games"
        >
          새로고침
        </button>
      </div>

      {/* 현재 URL 쿼리(테스트 확인용) */}
      <div data-testid="current-search">{location.search}</div>

      {/* 상태 */}
      {isLoading && (
        <div data-testid="gamelist-skeleton">
          <div
            style={{
              height: 16,
              marginBottom: 8,
              borderRadius: 4,
              background: '#eee',
            }}
          />
          <div
            style={{
              height: 16,
              marginBottom: 8,
              borderRadius: 4,
              background: '#eee',
            }}
          />
          <div style={{ height: 16, borderRadius: 4, background: '#eee' }} />
        </div>
      )}

      {isError && !isLoading && (
        <div data-testid="gamelist-error">
          <p>매치 목록을 불러오지 못했어요.</p>
          <button
            onClick={() => {
              void refetch();
            }}
            aria-label="retry-games"
          >
            재시도
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {hasGames ? (
            <ul
              data-testid="gamelist"
              style={{ listStyle: 'none', padding: 0 }}
            >
              {games.map((g) => (
                <li
                  key={g.gameId}
                  style={{ padding: 12, borderBottom: '1px solid #eee' }}
                >
                  <strong>{g.name}</strong>
                  <div>
                    인원: {g.playerCount} / 시작:{' '}
                    {new Date(g.startTime).toLocaleTimeString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div data-testid="gamelist-empty">
              <p>모집 중인 매치가 없어요.</p>
              <button aria-label="cta-create-game">퀵 매치 만들기</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
