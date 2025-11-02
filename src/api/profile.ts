import { apiClient } from '@/api/core/axiosInstance';

export type ProfileResponse = {
  name: string;
  email: string;
  imageUrl: string;
  description: string;
};

export async function getMyProfile() {
  const { data } = await apiClient.get<ProfileResponse>(
    '/api/v2/members/me/profile',
  );

  return data;
}
