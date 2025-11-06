import { apiClient } from '@/api/core/axiosInstance';

export type SchoolResponse = {
  id: number;
  name: string;
  domain: string;
};

export async function selectSchool(schoolId: number) {
  const { data } = await apiClient.post<SchoolResponse>(
    `/api/v1/members/me/school/${schoolId}`,
  );

  return data;
}
