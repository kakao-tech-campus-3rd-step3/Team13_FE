import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { notify } from '@/pages/notifications/notify';

import { requestImagePresign } from '../services/presign';
import { uploadViaPresignedUrl } from '../services/uploader';
import type {
  ImagePreview,
  PresignResponse,
  UploadErrorCode,
  UploadPhase,
  UploadProgress,
} from '../types';
import {
  readImageDimensions,
  revokeObjectUrl,
  toObjectUrl,
} from '../utils/image';
import { ALLOWED_MIME_TYPES, MAX_IMAGE_SIZE } from '../utils/limits';

type UseImageUploadOptions = {
  allowedMimeTypes?: string[];
  maxFileSize?: number;
  onUploaded?: (url: string, presign: PresignResponse) => void;
};

type UploadErrorState = {
  code: UploadErrorCode;
  message: string;
};

const defaultErrorMessages: Record<UploadErrorCode, string> = {
  FILE_TOO_LARGE: '10MB 이하 이미지만 업로드할 수 있어요.',
  FILE_TYPE_NOT_ALLOWED: '지원하지 않는 이미지 형식이에요.',
  READ_FAIL: '이미지 미리보기를 불러오지 못했어요.',
  NETWORK: '업로드 중 오류가 발생했어요. 네트워크 상태를 확인해 주세요.',
  CANCELED: '업로드가 취소되었어요.',
  UNKNOWN: '알 수 없는 오류가 발생했어요.',
};

export function useImageUpload({
  allowedMimeTypes = ALLOWED_MIME_TYPES,
  maxFileSize = MAX_IMAGE_SIZE,
  onUploaded,
}: UseImageUploadOptions = {}) {
  const [phase, setPhase] = useState<UploadPhase>('idle');
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<UploadErrorState | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const resetPreview = useCallback(() => {
    if (preview) {
      revokeObjectUrl(preview.objectUrl);
    }
    setPreview(null);
  }, [preview]);

  useEffect(() => () => resetPreview(), [resetPreview]);

  const emitError = useCallback(
    (code: UploadErrorCode, customMessage?: string) => {
      const message = customMessage ?? defaultErrorMessages[code];
      setError({ code, message });
      notify.error(message);
    },
    [],
  );

  const validateFile = useCallback(
    (file: File) => {
      if (!allowedMimeTypes.includes(file.type)) {
        emitError('FILE_TYPE_NOT_ALLOWED');
        return false;
      }

      if (file.size > maxFileSize) {
        emitError('FILE_TOO_LARGE');
        return false;
      }

      return true;
    },
    [allowedMimeTypes, emitError, maxFileSize],
  );

  const pick = useCallback(
    async (file: File) => {
      setError(null);
      setPhase('validating');

      const isValid = validateFile(file);
      if (!isValid) {
        setPhase('error');
        return;
      }

      const objectUrl = toObjectUrl(file);

      try {
        const { width, height } = await readImageDimensions(file);
        resetPreview();
        setPreview({
          objectUrl,
          width,
          height,
          mime: file.type,
          size: file.size,
          filename: file.name,
        });
        setPhase('ready');
      } catch {
        revokeObjectUrl(objectUrl);
        emitError('READ_FAIL');
        setPhase('error');
      }
    },
    [emitError, resetPreview, validateFile],
  );

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setProgress(null);
    setPhase('canceled');
    const message = defaultErrorMessages.CANCELED;
    setError({ code: 'CANCELED', message });
    notify.info(message);
  }, []);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setPhase('uploading');
      setProgress({ loaded: 0, total: file.size, percent: 0 });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const presign = await requestImagePresign(file);
        const publicUrl = await uploadViaPresignedUrl(presign, file, {
          signal: controller.signal,
          onProgress: setProgress,
        });

        setPhase('success');
        setProgress({ loaded: file.size, total: file.size, percent: 100 });
        notify.success('이미지가 업로드되었어요.');
        onUploaded?.(publicUrl, presign);
        return publicUrl;
      } catch {
        if (controller.signal.aborted) {
          setPhase('canceled');
          const message = defaultErrorMessages.CANCELED;
          setError({ code: 'CANCELED', message });
          return null;
        }

        setPhase('error');
        emitError('NETWORK');
        return null;
      } finally {
        abortRef.current = null;
      }
    },
    [emitError, onUploaded],
  );

  const clear = useCallback(() => {
    setPhase('idle');
    setProgress(null);
    setError(null);
    resetPreview();
  }, [resetPreview]);

  return useMemo(
    () => ({
      phase,
      preview,
      progress,
      error,
      pick,
      upload,
      cancel,
      clear,
    }),
    [cancel, clear, error, phase, pick, preview, progress, upload],
  );
}
