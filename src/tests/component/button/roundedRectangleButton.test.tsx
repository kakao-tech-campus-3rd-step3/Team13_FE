import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RoundedRectangleButton from '@/components/button/roundedRectangleButton';
import { colors } from '@/theme/color';

describe('RoundedRectangleButton', () => {
  it('renders children text', () => {
    render(<RoundedRectangleButton>버튼</RoundedRectangleButton>);
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('applies default blue styles', () => {
    render(<RoundedRectangleButton>스타일</RoundedRectangleButton>);
    const button = screen.getByRole('button', { name: '스타일' });
    expect(button).toHaveStyle(`background: ${colors.blue[700]}`);
    expect(button).toHaveStyle(`color: ${colors.gray[0]}`);
    expect(button).toHaveStyle(`border: 1px solid ${colors.blue[700]}`);
  });

  it('allows color override via props', () => {
    const custom = {
      background: colors.red[700],
      color: colors.gray[0],
      hover: colors.red[800],
      active: colors.red[900],
    };
    render(
      <RoundedRectangleButton colorSet={custom}>커스텀</RoundedRectangleButton>,
    );
    const button = screen.getByRole('button', { name: '커스텀' });
    expect(button).toHaveStyle(`background: ${colors.red[700]}`);
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(
      <RoundedRectangleButton onClick={handleClick}>
        클릭
      </RoundedRectangleButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows spinner and aria-busy when loading', () => {
    render(<RoundedRectangleButton loading ariaLabel="로딩" />);
    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<RoundedRectangleButton disabled>비활성</RoundedRectangleButton>);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });

  it('toggles pressed state', () => {
    const handle = vi.fn();
    render(
      <RoundedRectangleButton
        ariaLabel="토글"
        pressed={false}
        onPressedChange={handle}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '토글' }));
    expect(handle).toHaveBeenCalledWith(true);
  });
});
