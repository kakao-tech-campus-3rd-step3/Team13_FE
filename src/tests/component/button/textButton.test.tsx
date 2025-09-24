import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextButton, ToggleTextButton } from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

describe('TextButton 컴포넌트', () => {
  it('자식 요소를 렌더링한다', () => {
    render(<TextButton>텍스트</TextButton>);
    expect(screen.getByRole('button', { name: '텍스트' })).toBeInTheDocument();
  });

  it('클릭 이벤트를 처리한다', () => {
    const handleClick = vi.fn();
    render(<TextButton onClick={handleClick}>클릭</TextButton>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('기본 텍스트 스타일을 적용한다', () => {
    render(<TextButton>스타일</TextButton>);
    expect(screen.getByRole('button', { name: '스타일' })).toHaveStyle(
      `background: transparent; padding: ${spacing.spacing2} ${spacing.spacing4}; color: ${colors.text.default}`,
    );
  });

  it('disabled 속성이 설정되면 비활성화된다', () => {
    render(<TextButton disabled>비활성</TextButton>);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });

  it('로딩 중 스피너를 표시하고 aria-busy를 설정한다', () => {
    render(<TextButton loading ariaLabel="로딩" />);
    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('pressed 상태를 전환한다', () => {
    const handle = vi.fn();
    render(
      <ToggleTextButton
        ariaLabel="토글"
        pressed={false}
        onPressedChange={handle}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '토글' }));
    expect(handle).toHaveBeenCalledWith(true);
  });
});
