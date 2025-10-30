import { http, HttpResponse } from 'msw';

import { createErrorResponse } from '../sharedErrors';

type MemberProfile = {
  memberId: number;
  name: string;
  description: string;
  imageUrl: string;
};

const defaultMembers: MemberProfile[] = [
  {
    memberId: 101,
    name: '김대영',
    description: '부산대학교 농구 동아리 주장',
    imageUrl: 'https://example.com/avatar/kimdaeyoung.png',
  },
  {
    memberId: 102,
    name: '부산대학교 리그',
    description: '부산대학교 농구 리그 운영진',
    imageUrl: 'https://example.com/avatar/busan-league.png',
  },
];

let myProfile: MemberProfile = { ...defaultMembers[0] };

const memberDirectory = new Map<number, MemberProfile>();

const seedDirectory = () => {
  memberDirectory.clear();
  memberDirectory.set(myProfile.memberId, myProfile);
  for (const member of defaultMembers.slice(1)) {
    memberDirectory.set(member.memberId, { ...member });
  }
};

export const resetProfileState = () => {
  myProfile = { ...defaultMembers[0] };
  seedDirectory();
};

seedDirectory();

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const profileHandlers = [
  http.get('*/api/v2/members/me/profile', () =>
    HttpResponse.json({
      memberId: myProfile.memberId,
      name: myProfile.name,
      description: myProfile.description,
      imageUrl: myProfile.imageUrl,
    }),
  ),
  http.get('*/api/v2/members/:memberId/profile', ({ params }) => {
    const memberId = Number(params.memberId);

    if (Number.isNaN(memberId)) {
      return createErrorResponse('PROFILE_NOT_FOUND');
    }

    const profile = memberDirectory.get(memberId);

    if (!profile) {
      return createErrorResponse('PROFILE_NOT_FOUND');
    }

    return HttpResponse.json(profile);
  }),
  http.patch('*/api/v2/members/me/profile/name', async ({ request }) => {
    const body = (await request.json()) as { name?: string };
    const name = body?.name?.trim();

    if (!name || name.length < 2 || name.length > 20) {
      return createErrorResponse('PROFILE_INVALID_NAME');
    }

    myProfile = {
      ...myProfile,
      name,
    };
    memberDirectory.set(myProfile.memberId, myProfile);

    return HttpResponse.json({ name });
  }),
  http.patch('*/api/v2/members/me/profile/description', async ({ request }) => {
    const body = (await request.json()) as { description?: string };
    const description = body?.description ?? '';

    if (description.length > 150) {
      return createErrorResponse('PROFILE_INVALID_DESCRIPTION');
    }

    myProfile = {
      ...myProfile,
      description,
    };
    memberDirectory.set(myProfile.memberId, myProfile);

    return HttpResponse.json({ description });
  }),
  http.patch('*/api/v2/members/me/profile/image-url', async ({ request }) => {
    const body = (await request.json()) as { imageUrl?: string };
    const imageUrl = body?.imageUrl?.trim();

    if (!imageUrl || !isValidUrl(imageUrl)) {
      return createErrorResponse('PROFILE_INVALID_IMAGE_URL');
    }

    myProfile = {
      ...myProfile,
      imageUrl,
    };
    memberDirectory.set(myProfile.memberId, myProfile);

    return HttpResponse.json({ imageUrl });
  }),
];
