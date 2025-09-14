import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TextButton from '@/components/textButton';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

describe('TextButton', () => {
  it('renders children', () => {
    render(<TextButton>텍스트</TextButton>);
    expect(screen.getByRole('button', { name: '텍스트' })).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = vi.fn();
    render(<TextButton onClick={handleClick}>클릭</TextButton>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies default text styles', () => {
    render(<TextButton>스타일</TextButton>);
    expect(screen.getByRole('button', { name: '스타일' })).toHaveStyle(
      `background: transparent; padding: ${spacing.spacing2} ${spacing.spacing4}; color: ${colors.text.default}`,
    );
  });

  it('is disabled when disabled prop is set', () => {
    render(<TextButton disabled>비활성</TextButton>);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });

  it('shows spinner and sets aria-busy when loading', () => {
    render(<TextButton loading ariaLabel="로딩" />);
    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
  });

  it('toggles pressed state', () => {
    const handle = vi.fn();
    render(
      <TextButton ariaLabel="토글" pressed={false} onPressedChange={handle} />,
    );
    fireEvent.click(screen.getByRole('button', { name: '토글' }));
    expect(handle).toHaveBeenCalledWith(true);
  });
});
