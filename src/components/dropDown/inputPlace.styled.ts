/**
 * InputPlace 컴포넌트의 Emotion 스타일 정의
 */

import styled from '@emotion/styled';

/**
 * 전체 입력 컨테이너
 */
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

/**
 * 입력 헤더 (라벨 + 액션 버튼들)
 */
export const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 16px;
  font-weight: 500;
  color: #111827;
`;

/**
 * 실제 입력 필드
 */
export const InputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #111827;
  background: transparent;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
  }
`;

/**
 * 액션 버튼들 컨테이너
 */
export const InputActions = styled.div`
  display: flex;
  gap: 8px;
`;

/**
 * 액션 버튼 (지우기, 뒤로가기)
 */
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: #374151;
  }

  &:focus {
    outline: none;
    color: #3b82f6;
  }
`;
