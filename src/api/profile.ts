import { isAxiosError } from 'axios';

import { apiClient } from '@/api/core/axiosInstance';

export type ProfileResponse = {
  name: string;
  email: string;
  imageUrl: string;
  description: string;
};

export type UpdateProfileRequest = {
  name?: string;
  imageUrl?: string | null;
  description?: string | null;
};

export async function getMyProfile() {
  const { data } = await apiClient.get<ProfileResponse>(
    '/api/v1/members/me/profile',
  );

  return data;
}

async function patchOrPost<T>(url: string, body: unknown) {
  try {
    const { data } = await apiClient.patch<T>(url, body);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404 || status === 405) {
        const { data } = await apiClient.post<T>(url, body);
        return data;
      }
    }
    throw error;
  }
}

export async function updateMyProfileName(name: string) {
  return patchOrPost<ProfileResponse>('/api/v1/members/me/profile/name', {
    name: name.trim(),
  });
}

export async function updateMyProfileImageUrl(imageUrl: string) {
  return patchOrPost<ProfileResponse>('/api/v1/members/me/profile/image-url', {
    imageUrl: imageUrl.trim(),
  });
}

export async function updateMyProfileDescription(description: string) {
  return patchOrPost<ProfileResponse>(
    '/api/v1/members/me/profile/description',
    { description },
  );
}

export async function updateMyProfile({
  name,
  imageUrl,
  description,
}: UpdateProfileRequest) {
  let latest: ProfileResponse | null = null;

  if (typeof name === 'string') {
    latest = await updateMyProfileName(name);
  }

  if (typeof imageUrl === 'string') {
    latest = await updateMyProfileImageUrl(imageUrl);
  }

  if (typeof description === 'string') {
    latest = await updateMyProfileDescription(description);
  }

  if (!latest) {
    latest = await getMyProfile();
  }

  return latest;
}
