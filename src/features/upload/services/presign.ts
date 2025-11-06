import { apiClient } from '@/api/core/axiosInstance';

import type { PresignResponse } from '../types';

type PresignPayload = {
  filename: string;
  contentType: string;
  size: number;
  scope?: string;
};

export async function requestImagePresign(
  file: File,
  scope: string = 'profile-image',
) {
  const payload: PresignPayload = {
    filename: file.name,
    contentType: file.type || 'application/octet-stream',
    size: file.size,
    scope,
  };

  const { data } = await apiClient.post<PresignResponse>(
    '/api/v1/uploads/presign',
    payload,
  );

  return data;
}
