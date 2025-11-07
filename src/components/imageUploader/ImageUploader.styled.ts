import styled from '@emotion/styled';

import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

/**
 * 컨테이너
 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.spacing2};
  width: 100%;
`;

/**
 * 라벨
 */
export const Label = styled.label`
  ${typography.body1Bold};
  color: ${colors.text.default};
`;

/**
 * 업로드 영역
 */
export const UploadArea = styled.div<{ hasImage: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 2px dashed ${colors.border.default};
  border-radius: 16px;
  background: ${({ hasImage }) =>
    hasImage ? colors.background.default : colors.background.fill};
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.blue[500]};
    background: ${({ hasImage }) =>
      hasImage ? colors.background.default : colors.blue[0]};

    /* ImageOverlay 호버 효과 */
    > div:last-of-type {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
`;

/**
 * 숨겨진 파일 input
 */
export const HiddenInput = styled.input`
  display: none;
`;

/**
 * 업로드 버튼 (이미지 없을 때 표시)
 */
export const UploadButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing3};
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/**
 * 업로드 아이콘
 */
export const UploadIcon = styled.div`
  font-size: 48px;
  color: ${colors.gray[600]};
  transition: all 0.2s ease;

  button:hover & {
    color: ${colors.blue[600]};
    transform: translateY(-4px);
  }
`;

/**
 * 업로드 텍스트
 */
export const UploadText = styled.div`
  ${typography.body2Regular};
  color: ${colors.text.sub};
  text-align: center;
`;

/**
 * 이미지 미리보기
 */
export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/**
 * 이미지 위 오버레이 (변경/삭제 버튼)
 */
export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.spacing3};
  opacity: 0;
  transition: all 0.3s ease;
`;

/**
 * 오버레이 버튼
 */
export const OverlayButton = styled.button<{ variant?: 'change' | 'delete' }>`
  ${typography.body2Bold};
  padding: ${spacing.spacing3} ${spacing.spacing4};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  ${({ variant = 'change' }) =>
    variant === 'change'
      ? `
    background: rgba(255, 255, 255, 0.95);
    color: ${colors.text.default};
    
    &:hover {
      background: ${colors.gray[0]};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  `
      : `
    background: rgba(252, 106, 102, 0.95);
    color: ${colors.gray[0]};
    
    &:hover {
      background: ${colors.red[700]};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(250, 52, 44, 0.3);
    }
  `}

  &:active {
    transform: translateY(0px);
  }
`;

/**
 * 파일 정보 (선택 사항)
 */
export const FileInfo = styled.div`
  ${typography.label2Regular};
  color: ${colors.text.sub};
  padding: ${spacing.spacing2} ${spacing.spacing3};
  background: ${colors.background.fill};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: ${spacing.spacing2};
`;

/**
 * 에러 메시지
 */
export const ErrorMessage = styled.div`
  ${typography.label2Regular};
  color: ${colors.status.critical};
  padding: ${spacing.spacing2} ${spacing.spacing3};
  background: ${colors.status.criticalBackground};
  border-radius: 8px;
`;
