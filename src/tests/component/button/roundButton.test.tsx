import { render, screen, fireEvent } from '@testing-library/react';
import { FaThumbsUp } from 'react-icons/fa';
import { describe, it, expect, vi } from 'vitest';

import { RoundButton, ToggleRoundButton } from '@/components/button';
import { spacing } from '@/theme/spacing';

describe('RoundButton 컴포넌트', () => {
  it('아이콘 자식 요소를 렌더링한다', () => {
    render(
      <RoundButton ariaLabel="좋아요">
        <FaThumbsUp />
      </RoundButton>,
    );
    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
  });

  it('pressed 상태 변경을 처리한다', () => {
    const handleChange = vi.fn();
    render(
      <ToggleRoundButton
        ariaLabel="토글"
        pressed={false}
        onPressedChange={handleChange}
      >
        <FaThumbsUp />
      </ToggleRoundButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: '토글' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('로딩 스피너를 표시하고 aria-busy를 설정한다', () => {
    render(
      <RoundButton ariaLabel="로딩" loading>
        <FaThumbsUp />
      </RoundButton>,
    );
    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('md와 lg 크기 스타일을 적용한다', () => {
    const { rerender } = render(<RoundButton ariaLabel="md 크기" size="md" />);
    const mdButton = screen.getByRole('button', { name: 'md 크기' });
    expect(mdButton).toHaveStyle(`width: ${spacing.spacing12}`);
    expect(mdButton).toHaveStyle(`height: ${spacing.spacing12}`);

    rerender(<RoundButton ariaLabel="lg 크기" size="lg" />);
    const lgButton = screen.getByRole('button', { name: 'lg 크기' });
    expect(lgButton).toHaveStyle(`width: ${spacing.spacing16}`);
    expect(lgButton).toHaveStyle(`height: ${spacing.spacing16}`);
  });

  it('disabled 속성이 설정되면 비활성화된다', () => {
    render(<RoundButton ariaLabel="비활성" disabled />);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });
});
