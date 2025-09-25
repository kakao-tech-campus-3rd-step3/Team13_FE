import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RoundedRectangleButton } from '@/components/button';
import { colors } from '@/theme/color';

describe('RoundedRectangleButton 컴포넌트', () => {
  it('자식 텍스트를 렌더링한다', () => {
    render(<RoundedRectangleButton>버튼</RoundedRectangleButton>);
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('기본 파란색 스타일을 적용한다', () => {
    render(<RoundedRectangleButton>스타일</RoundedRectangleButton>);
    const button = screen.getByRole('button', { name: '스타일' });
    expect(button).toHaveStyle(`background: ${colors.blue[700]}`);
    expect(button).toHaveStyle(`color: ${colors.gray[0]}`);
    expect(button).toHaveStyle(`border: 1px solid ${colors.blue[700]}`);
  });

  it('props로 색상을 덮어쓴다', () => {
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

  it('클릭 이벤트를 처리한다', () => {
    const handleClick = vi.fn();
    render(
      <RoundedRectangleButton onClick={handleClick}>
        클릭
      </RoundedRectangleButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('로딩 중 스피너를 표시하고 aria-busy를 설정한다', () => {
    render(<RoundedRectangleButton loading ariaLabel="로딩" />);
    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('disabled 속성이 설정되면 비활성화된다', () => {
    render(<RoundedRectangleButton disabled>비활성</RoundedRectangleButton>);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });
});
