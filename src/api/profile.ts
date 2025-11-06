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
    '/api/v2/members/me/profile',
  );

  return data;
}

export async function updateMyProfileName(name: string) {
  const { data } = await apiClient.patch<ProfileResponse>(
    '/api/v2/members/me/profile/name',
    { name: name.trim() },
  );

  return data;
}

export async function updateMyProfileImageUrl(imageUrl: string) {
  const { data } = await apiClient.patch<ProfileResponse>(
    '/api/v2/members/me/profile/image-url',
    { imageUrl: imageUrl.trim() },
  );

  return data;
}

export async function updateMyProfileDescription(description: string) {
  const { data } = await apiClient.patch<ProfileResponse>(
    '/api/v2/members/me/profile/description',
    { description },
  );

  return data;
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
