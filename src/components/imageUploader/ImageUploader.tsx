/**
 * ImageUploader 컴포넌트
 * 버튼 클릭 → 파일 선택 → 미리보기 표시
 */

import React, { useRef, useState } from 'react';

import * as S from './ImageUploader.styled';

interface ImageUploaderProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  className?: string;
  maxSizeMB?: number; // 최대 파일 크기 (MB)
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = '사진 업로드 (선택)',
  className,
  maxSizeMB = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 파일 선택 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // 이미지 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 검증
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxSizeMB) {
      setError(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
      return;
    }

    // 미리보기 URL 생성
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange(file);

    // input 값 초기화 (같은 파일 재선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 변경
  const handleChangeImage = () => {
    handleUploadClick();
  };

  // 이미지 삭제
  const handleDeleteImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onChange(null);
    setError(null);
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <S.Container className={className}>
      {label && <S.Label>{label}</S.Label>}

      {/* 숨겨진 file input */}
      <S.HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* 업로드 영역 */}
      <S.UploadArea hasImage={!!previewUrl}>
        {!previewUrl ? (
          // 이미지 없을 때: 업로드 버튼
          <S.UploadButton onClick={handleUploadClick} type="button">
            <S.UploadIcon>📷</S.UploadIcon>
            <S.UploadText>
              클릭하여 이미지를 선택해주세요
              <br />
              (PNG, JPG, WEBP 등)
            </S.UploadText>
          </S.UploadButton>
        ) : (
          // 이미지 있을 때: 미리보기 + 오버레이
          <>
            <S.PreviewImage src={previewUrl} alt="업로드된 이미지 미리보기" />
            <S.ImageOverlay>
              <S.OverlayButton
                variant="change"
                onClick={handleChangeImage}
                type="button"
              >
                변경
              </S.OverlayButton>
              <S.OverlayButton
                variant="delete"
                onClick={handleDeleteImage}
                type="button"
              >
                삭제
              </S.OverlayButton>
            </S.ImageOverlay>
          </>
        )}
      </S.UploadArea>

      {/* 파일 정보 */}
      {value && !error && (
        <S.FileInfo>
          📎 {value.name} ({formatFileSize(value.size)})
        </S.FileInfo>
      )}

      {/* 에러 메시지 */}
      {error && <S.ErrorMessage>⚠️ {error}</S.ErrorMessage>}
    </S.Container>
  );
};
