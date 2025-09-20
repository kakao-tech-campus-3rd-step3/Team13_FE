import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button, { ToggleButton } from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>비활성</Button>);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });

  it('passes through arbitrary aria attributes', () => {
    render(
      <Button aria-label="more" aria-describedby="tip">
        텍스트
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'more' })).toHaveAttribute(
      'aria-describedby',
      'tip',
    );
  });

  it('shows spinner and sets aria-busy when loading', () => {
    render(<Button loading ariaLabel="로딩 버튼" />);
    const btn = screen.getByRole('button', { name: '로딩 버튼' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
  });

  it('applies primary variant styles', () => {
    render(<Button variant="primary">스타일</Button>);
    expect(screen.getByRole('button', { name: '스타일' })).toHaveStyle(
      `background: ${colors.brand.kakaoYellow}`,
    );
  });

  it('applies lg size padding', () => {
    render(<Button size="lg">큰 버튼</Button>);
    expect(screen.getByRole('button', { name: '큰 버튼' })).toHaveStyle(
      `padding: ${spacing.spacing4} ${spacing.spacing6}`,
    );
  });
});

describe('ToggleButton', () => {
  it('toggles pressed state', () => {
    const handleChange = vi.fn();
    render(
      <ToggleButton
        variant="icon"
        ariaLabel="좋아요"
        pressed={false}
        onPressedChange={handleChange}
      >
        🤍
      </ToggleButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: '좋아요' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
