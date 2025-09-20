import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';

describe('App', () => {
  it('이메일 입력 컴포넌트를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByLabelText('이메일 아이디 입력')).toBeInTheDocument();
  });

  it('renders navigation tabs and switches content', () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: 'Home' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Search' }));
    expect(screen.getByText('Search Content')).toBeInTheDocument();
  });
  it('프로필 버튼 클릭 시 카운트가 증가한다', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'profile' }));
    expect(screen.getByText('Profile 클릭 횟수: 1')).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: '카운트 증가' }));
    expect(screen.getByText('현재 카운트: 1')).toBeInTheDocument();
  });

  it('toggles like button', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: '좋아요 토글' });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('increments text count when TextButton is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: '텍스트 증가' }));
    expect(screen.getByText('텍스트 카운트: 1')).toBeInTheDocument();
  });
});
