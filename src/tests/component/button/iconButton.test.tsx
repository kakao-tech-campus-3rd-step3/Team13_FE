import { render, screen, fireEvent } from '@testing-library/react';
import { FaThumbsUp } from 'react-icons/fa';
import { describe, it, expect, vi } from 'vitest';

import IconButton, { ToggleIconButton } from '@/components/button/iconButton';
import { spacing } from '@/theme/spacing';

describe('IconButton 컴포넌트', () => {
  it('아이콘 자식 요소를 렌더링한다', () => {
    render(
      <IconButton ariaLabel="좋아요">
        <FaThumbsUp />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
  });

  it('pressed 상태 변경을 처리한다', () => {
    const handleChange = vi.fn();
    render(
      <ToggleIconButton
        ariaLabel="토글"
        pressed={false}
        onPressedChange={handleChange}
      >
        <FaThumbsUp />
      </ToggleIconButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: '토글' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('로딩 스피너를 표시하고 aria-busy를 설정한다', () => {
    render(
      <IconButton ariaLabel="로딩" loading>
        <FaThumbsUp />
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('spacing 기반 크기를 적용한다', () => {
    render(
      <IconButton ariaLabel="크기 테스트">
        <FaThumbsUp />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: '크기 테스트' })).toHaveStyle(
      `width: ${spacing.spacing10}`,
    );
  });
});
