import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type School = { id: number; name: string; domain: string };
type SchoolsResponse = { schools: School[] };

let nextSchoolId = 200;
const schools = new Map<number, School>([
  [101, { id: 101, name: '부산대학교', domain: 'pusan.ac.kr' }],
  [102, { id: 102, name: '서울대학교', domain: 'snu.ac.kr' }],
]);

export const resetSchoolsState = () => {
  nextSchoolId = 200;
  schools.clear();
  schools.set(101, { id: 101, name: '부산대학교', domain: 'pusan.ac.kr' });
  schools.set(102, { id: 102, name: '서울대학교', domain: 'snu.ac.kr' });
};

// GET /api/v1/schools
const list = http.get<never, never, SchoolsResponse>('*/api/v1/schools', () =>
  HttpResponse.json<SchoolsResponse>({ schools: Array.from(schools.values()) }),
);

// GET /api/v1/schools/:schoolId
const getOne = http.get<{ schoolId: string }, never, School | ApiErrorResponse>(
  '*/api/v1/schools/:schoolId',
  ({ params }) => {
    const id = Number(params.schoolId);
    const s = schools.get(id);
    if (!s) return createErrorResponse('SCHOOL_NOT_FOUND');
    return HttpResponse.json<School>(s);
  },
);

// POST /api/v1/schools { name, domain }
const create = http.post<never, { name?: string; domain?: string }, School>(
  '*/api/v1/schools',
  async ({ request }) => {
    const body = (await request.json()) as { name?: string; domain?: string };
    const id = ++nextSchoolId;
    const s: School = {
      id,
      name: String(body?.name ?? ''),
      domain: String(body?.domain ?? ''),
    };
    schools.set(id, s);
    return HttpResponse.json<School>(s);
  },
);

// POST /api/v1/members/me/school/:schoolId
const select = http.post<
  { schoolId: string },
  never,
  School | ApiErrorResponse
>('*/api/v1/members/me/school/:schoolId', ({ params }) => {
  const id = Number(params.schoolId);
  const s = schools.get(id);
  if (!s) return createErrorResponse('SCHOOL_NOT_FOUND');
  return HttpResponse.json<School>(s);
});

export const schoolsHandlers = [list, getOne, create, select];
