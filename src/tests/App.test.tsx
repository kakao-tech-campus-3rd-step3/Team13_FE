import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';

describe('App 컴포넌트', () => {
  it('이메일 입력 컴포넌트를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByLabelText('이메일 아이디 입력')).toBeInTheDocument();
  });

  it('내비게이션 탭을 렌더링하고 콘텐츠를 전환한다', () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: '홈' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: '검색' }));
    expect(screen.getByText('검색 콘텐츠')).toBeInTheDocument();
  });
  it('프로필 버튼 클릭 시 카운트가 증가한다', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: '프로필' }));
    expect(screen.getByText('프로필 클릭 횟수: 1')).toBeInTheDocument();
  });

  it('버튼을 클릭하면 카운트를 증가시킨다', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: '카운트 증가' }));
    expect(screen.getByText('현재 카운트: 1')).toBeInTheDocument();
  });

  it('좋아요 버튼을 토글한다', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: '좋아요 토글' });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('텍스트 버튼 클릭 시 카운트를 증가시킨다', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: '텍스트 증가' }));
    expect(screen.getByText('텍스트 카운트: 1')).toBeInTheDocument();
  });
});
