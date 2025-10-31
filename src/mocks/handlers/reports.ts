import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type ReportStatus = 'OPEN' | 'RESOLVED';
type Report = {
  id: number;
  gameId: number;
  reporterId: number;
  reportedId: number;
  reasonText: string;
  status: ReportStatus;
  createdAt: string;
};
type GameReportsResponse = { reports: Report[] };

let nextReportId = 9000;
const reports = new Map<number, Report>();

export const resetReportsState = () => {
  nextReportId = 9000;
  reports.clear();
};

const create = http.post<
  never,
  { gameId?: number; reportedId?: number; reasonText?: string },
  Report
>('*/api/v1/reports', async ({ request }) => {
  const body = (await request.json()) as {
    gameId?: number;
    reportedId?: number;
    reasonText?: string;
  };
  const id = ++nextReportId;
  const r: Report = {
    id,
    gameId: Number(body.gameId ?? 0),
    reporterId: 101,
    reportedId: Number(body.reportedId ?? 0),
    reasonText: String(body.reasonText ?? ''),
    status: 'OPEN',
    createdAt: new Date().toISOString(),
  };
  reports.set(id, r);
  return HttpResponse.json<Report>(r);
});

const list = http.get<never, never, GameReportsResponse>(
  '*/api/v1/reports',
  () =>
    HttpResponse.json<GameReportsResponse>({
      reports: Array.from(reports.values()),
    }),
);

const byGame = http.get<{ gameId: string }, never, GameReportsResponse>(
  '*/api/v1/reports/game/:gameId',
  ({ params }) => {
    const gid = Number(params.gameId);
    const list = Array.from(reports.values()).filter((r) => r.gameId === gid);
    return HttpResponse.json<GameReportsResponse>({ reports: list });
  },
);

const byMember = http.get<{ memberId: string }, never, GameReportsResponse>(
  '*/api/v1/reports/member/:memberId',
  ({ params }) => {
    const mid = Number(params.memberId);
    const list = Array.from(reports.values()).filter(
      (r) => r.reporterId === mid || r.reportedId === mid,
    );
    return HttpResponse.json<GameReportsResponse>({ reports: list });
  },
);

const patchStatus = http.patch<
  { reportId: string },
  { status?: ReportStatus },
  Report | ApiErrorResponse
>('*/api/v1/reports/:reportId/status', async ({ params, request }) => {
  const id = Number(params.reportId);
  const r = reports.get(id);
  if (!r) return createErrorResponse('REPORT_NOT_FOUND');

  const body = (await request.json()) as { status?: ReportStatus };
  if (!body?.status || !['OPEN', 'RESOLVED'].includes(body.status)) {
    return createErrorResponse('REPORT_INVALID_STATUS');
  }
  r.status = body.status;
  reports.set(id, r);
  return HttpResponse.json<Report>(r);
});

export const reportsHandlers = [create, list, byGame, byMember, patchStatus];
