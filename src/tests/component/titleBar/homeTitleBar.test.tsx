import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import HomeTitleBar from '@/components/titleBar/homeTitleBar';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

describe('HomeTitleBar 컴포넌트', () => {
  it('제목을 렌더링한다', () => {
    render(
      <MemoryRouter>
        <HomeTitleBar title="홈" navigateTo="/login" />
      </MemoryRouter>,
    );
    expect(screen.getByText('홈')).toBeInTheDocument();
  });

  it('좌측 아이콘 버튼이 존재하지 않는다', () => {
    render(
      <MemoryRouter>
        <HomeTitleBar title="홈" navigateTo="/login" />
      </MemoryRouter>,
    );
    expect(screen.queryByRole('button', { name: '메뉴' })).toBeNull();
  });

  it('우측 프로필 아이콘이 렌더링된다', () => {
    render(
      <MemoryRouter>
        <HomeTitleBar title="홈" navigateTo="/login" />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('button', { name: '프로필' }).firstChild,
    ).toBeInTheDocument();
  });

  it('스타일이 적용된다', () => {
    render(
      <MemoryRouter>
        <HomeTitleBar title="홈" navigateTo="/login" />
      </MemoryRouter>,
    );
    const title = screen.getByText('홈');
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );
    const profileButton = screen.getByRole('button', { name: '프로필' });
    expect(profileButton).toHaveStyle(`width: ${spacing.spacing10}`);
    const profileIcon = profileButton.firstChild as HTMLElement;
    expect(profileIcon).toHaveStyle(`color: #4573a1`);
  });
});
