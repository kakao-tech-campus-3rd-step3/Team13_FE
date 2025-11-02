import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';
import type { ApiErrorResponse } from '../sharedErrors';

type Profile = {
  memberId: number;
  name: string;
  email: string;
  imageUrl: string;
  description: string;
};

type ProfileResponse = {
  name: string;
  email: string;
  imageUrl: string;
  description: string;
};

const defaultMembers: Profile[] = [
  {
    memberId: 101,
    name: '김대영',
    email: 'kimdy@pusan.ac.kr',
    description: '부산대학교 농구 동아리 주장',
    imageUrl: 'https://example.com/avatar/kimdaeyoung.png',
  },
  {
    memberId: 102,
    name: '부산대학교 리그',
    email: 'league@pusan.ac.kr',
    description: '부산대학교 농구 리그 운영진',
    imageUrl: 'https://example.com/avatar/busan-league.png',
  },
];

let myProfile: Profile = { ...defaultMembers[0] };
const directory = new Map<number, Profile>();

const seed = () => {
  directory.clear();
  directory.set(myProfile.memberId, myProfile);
  for (const m of defaultMembers.slice(1)) directory.set(m.memberId, { ...m });
};
seed();

export const resetProfileState = () => {
  myProfile = { ...defaultMembers[0] };
  seed();
};

const isValidUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const toResponse = (p: Profile): ProfileResponse => ({
  name: p.name,
  email: p.email,
  imageUrl: p.imageUrl,
  description: p.description,
});

const getMe = http.get<never, never, ProfileResponse>(
  '*/api/v2/members/me/profile',
  () => HttpResponse.json<ProfileResponse>(toResponse(myProfile)),
);

const getMember = http.get<
  { memberId: string },
  never,
  ProfileResponse | ApiErrorResponse
>('*/api/v2/members/:memberId/profile', ({ params }) => {
  const memberId = Number(params.memberId);
  if (Number.isNaN(memberId)) return createErrorResponse('PROFILE_NOT_FOUND');
  const p = directory.get(memberId);
  if (!p) return createErrorResponse('PROFILE_NOT_FOUND');
  return HttpResponse.json<ProfileResponse>(toResponse(p));
});

const patchName = http.patch<
  never,
  { name?: string },
  ProfileResponse | ApiErrorResponse
>('*/api/v2/members/me/profile/name', async ({ request }) => {
  const body = (await request.json()) as { name?: string };
  const name = body?.name?.trim() ?? '';
  if (!name || name.length > 31)
    return createErrorResponse('PROFILE_INVALID_NAME');
  myProfile = { ...myProfile, name };
  directory.set(myProfile.memberId, myProfile);
  return HttpResponse.json<ProfileResponse>(toResponse(myProfile));
});

const patchImageUrl = http.patch<
  never,
  { imageUrl?: string },
  ProfileResponse | ApiErrorResponse
>('*/api/v2/members/me/profile/image-url', async ({ request }) => {
  const body = (await request.json()) as { imageUrl?: string };
  const imageUrl = body?.imageUrl?.trim() ?? '';
  if (!imageUrl || imageUrl.length > 255 || !isValidUrl(imageUrl))
    return createErrorResponse('PROFILE_INVALID_IMAGE_URL');
  myProfile = { ...myProfile, imageUrl };
  directory.set(myProfile.memberId, myProfile);
  return HttpResponse.json<ProfileResponse>(toResponse(myProfile));
});

const patchDescription = http.patch<
  never,
  { description?: string },
  ProfileResponse | ApiErrorResponse
>('*/api/v2/members/me/profile/description', async ({ request }) => {
  const body = (await request.json()) as { description?: string };
  const description = (body?.description ?? '').toString();
  if (description.length > 255)
    return createErrorResponse('PROFILE_INVALID_DESCRIPTION');
  myProfile = { ...myProfile, description };
  directory.set(myProfile.memberId, myProfile);
  return HttpResponse.json<ProfileResponse>(toResponse(myProfile));
});

export const profileHandlers = [
  getMe,
  getMember,
  patchName,
  patchImageUrl,
  patchDescription,
];
