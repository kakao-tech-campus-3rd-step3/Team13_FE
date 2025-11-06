import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';
import { theme } from '@/theme';

describe('App 컴포넌트', () => {
  it('홈 페이지를 렌더링한다', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    );
    expect(screen.getByText('Team13 Demo Home')).toBeInTheDocument();
    expect(
      screen.getByText(
        '컴포넌트 테스트 전용 페이지로 이동해 최신 훅 UI를 확인하세요.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: '컴포넌트 테스트 홈' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '스포츠 목록 테스트' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '게임 리스트 테스트' }),
    ).toBeInTheDocument();
  });
});
