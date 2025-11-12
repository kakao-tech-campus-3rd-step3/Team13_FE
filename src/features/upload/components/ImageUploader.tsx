import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ChangeEvent,
} from 'react';

import { notify } from '@/pages/notifications/notify';

import { useImageUpload } from '../hooks/useImageUpload';
import type { PresignResponse } from '../types';

import * as S from './ImageUploader.styled';

type Props = {
  label?: string;
  description?: string;
  onUploaded?: (url: string, presign: PresignResponse) => void;
};

const bytesToHuman = (bytes: number) => {
  if (bytes === 0) return '0B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)}${units[index]}`;
};

export function ImageUploader({
  label = '프로필 이미지',
  description = '10MB 이하 · JPG · PNG · WEBP',
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<File | null>(null);
  const inputId = useId();
  const inputLabelId = `${inputId}-label`;
  const accessibleLabel = `${label} 파일 선택`;
  const { phase, preview, progress, error, pick, upload, cancel, clear } =
    useImageUpload({
      onUploaded,
    });

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      fileRef.current = file;
      void pick(file);
    },
    [pick],
  );

  const resetInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const handleClear = useCallback(() => {
    fileRef.current = null;
    resetInput();
    clear();
  }, [clear, resetInput]);

  useEffect(() => {
    if (phase === 'success') {
      fileRef.current = null;
      resetInput();
    }
  }, [phase, resetInput]);

  const handleUpload = useCallback(async () => {
    const file = fileRef.current;
    if (!file) {
      notify.info('업로드할 이미지를 먼저 선택해 주세요.');
      return;
    }

    await upload(file);
  }, [upload]);

  const handleRetry = useCallback(async () => {
    const file = fileRef.current;
    if (!file) {
      notify.info('다시 업로드할 이미지를 선택해 주세요.');
      return;
    }

    await upload(file);
  }, [upload]);

  const statusMessage = useMemo(() => {
    if (error) return `⚠️ ${error.message}`;
    if (phase === 'validating') return '이미지를 확인하는 중이에요…';
    if (phase === 'ready')
      return '미리보기가 준비되었어요. 업로드를 시작해 주세요.';
    if (phase === 'uploading') return '이미지를 업로드하고 있어요.';
    if (phase === 'success') return '이미지가 성공적으로 업로드되었어요!';
    if (phase === 'canceled')
      return '업로드가 취소되었어요. 다시 시도할 수 있어요.';
    return '이미지 업로드 준비가 되어 있어요.';
  }, [error, phase]);

  const canUpload =
    phase === 'ready' || phase === 'error' || phase === 'canceled';
  const isUploading = phase === 'uploading';

  return (
    <S.Container aria-label="image-uploader">
      <S.Header>
        <S.Title>{label}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Header>

      <S.Body>
        <S.PreviewRow>
          <S.PreviewRing>
            <S.PreviewInner>
              {preview ? (
                <S.PreviewImage
                  src={preview.objectUrl}
                  alt="선택한 이미지 미리보기"
                />
              ) : (
                <S.PreviewPlaceholder>이미지 추가</S.PreviewPlaceholder>
              )}
            </S.PreviewInner>
          </S.PreviewRing>

          <S.PreviewMeta>
            <S.MetaRow>
              <S.Badge aria-live="polite">
                {preview?.filename ?? '파일을 선택해 주세요'}
              </S.Badge>
              {preview?.size ? <span>{bytesToHuman(preview.size)}</span> : null}
              {preview?.width && preview?.height ? (
                <span>
                  {preview.width} × {preview.height}
                </span>
              ) : null}
            </S.MetaRow>
            <S.Status role="status" aria-live="polite" aria-atomic="true">
              {statusMessage}
            </S.Status>
            {error ? <S.ErrorText>{error.message}</S.ErrorText> : null}
          </S.PreviewMeta>
        </S.PreviewRow>

        {isUploading ? (
          <S.ProgressArea>
            <S.ProgressTrack
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress?.percent ?? 0}
              aria-live="polite"
            >
              <S.ProgressIndicator percent={progress?.percent ?? 0} />
            </S.ProgressTrack>
          </S.ProgressArea>
        ) : null}
      </S.Body>

      <S.VisuallyHiddenLabel htmlFor={inputId} id={inputLabelId}>
        {accessibleLabel}
      </S.VisuallyHiddenLabel>

      <S.HiddenFileInput
        id={inputId}
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-labelledby={inputLabelId}
        onChange={handleFileChange}
      />

      <S.Actions>
        <S.GhostButton
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="파일 선택"
        >
          파일 선택
        </S.GhostButton>

        <S.PrimaryButton
          type="button"
          onClick={() => {
            void handleUpload();
          }}
          disabled={!canUpload || isUploading}
          aria-label="이미지 업로드"
        >
          {isUploading ? '업로드 중…' : '업로드'}
        </S.PrimaryButton>

        <S.GhostButton
          type="button"
          onClick={handleClear}
          disabled={!preview && !fileRef.current}
          aria-label="선택 초기화"
        >
          초기화
        </S.GhostButton>

        {isUploading ? (
          <S.DangerButton
            type="button"
            onClick={cancel}
            aria-label="업로드 취소"
          >
            취소
          </S.DangerButton>
        ) : null}

        {phase === 'error' ? (
          <S.PrimaryButton
            type="button"
            onClick={() => {
              void handleRetry();
            }}
            aria-label="업로드 재시도"
          >
            재시도
          </S.PrimaryButton>
        ) : null}
      </S.Actions>
    </S.Container>
  );
}

export default ImageUploader;
