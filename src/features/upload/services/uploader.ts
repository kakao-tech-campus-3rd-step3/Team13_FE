import axios, { type AxiosRequestConfig } from 'axios';

import type { PresignResponse, UploadProgress } from '../types';

type UploadOptions = {
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal;
};

export async function uploadViaPresignedUrl(
  presign: PresignResponse,
  file: File,
  options: UploadOptions = {},
) {
  const headers: Record<string, string> = {
    'Content-Type': file.type || 'application/octet-stream',
    ...presign.requiredHeaders,
  };

  const config: AxiosRequestConfig = {
    headers,
    signal: options.signal,
    onUploadProgress: (event) => {
      if (!options.onProgress || !event.total) return;

      const percent = Math.round((event.loaded / event.total) * 100);
      options.onProgress({
        loaded: event.loaded,
        total: event.total,
        percent,
      });
    },
  };

  await axios.put(presign.uploadUrl, file, config);

  return presign.publicUrl;
}
