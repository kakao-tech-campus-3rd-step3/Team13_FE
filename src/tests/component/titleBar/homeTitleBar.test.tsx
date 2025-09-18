import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import HomeTitleBar from '@/components/titleBar/homeTitleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

describe('HomeTitleBar', () => {
  it('제목을 렌더링한다', () => {
    render(<HomeTitleBar title="홈" onMenu={() => {}} />);
    expect(screen.getByText('홈')).toBeInTheDocument();
  });

  it('좌측 아이콘 버튼이 존재하지 않는다', () => {
    render(<HomeTitleBar title="홈" onMenu={() => {}} />);
    expect(screen.queryByRole('button', { name: 'menu' })).toBeNull();
  });

  it('우측 프로필 아이콘이 렌더링된다', () => {
    render(<HomeTitleBar title="홈" onMenu={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'profile' }).firstChild,
    ).toBeInTheDocument();
  });

  it('우측 프로필 버튼 클릭 시 핸들러가 호출된다', () => {
    const handleMenu = vi.fn();
    render(<HomeTitleBar title="홈" onMenu={handleMenu} />);
    fireEvent.click(screen.getByRole('button', { name: 'profile' }));
    expect(handleMenu).toHaveBeenCalled();
  });

  it('스타일이 적용된다', () => {
    render(<HomeTitleBar title="홈" onMenu={() => {}} />);
    const title = screen.getByText('홈');
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );
    const profileButton = screen.getByRole('button', { name: 'profile' });
    expect(profileButton).toHaveStyle(`width: ${spacing.spacing10}`);
    const profileIcon = profileButton.firstChild as HTMLElement;
    expect(profileIcon).toHaveStyle(`color: ${colors.text.default}`);
  });
});
