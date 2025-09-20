import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import LoginButton, {
  ToggleLoginButton,
} from '@/components/button/loginButton';
import { colors } from '@/theme/color';

describe('LoginButton', () => {
  it('renders default text', () => {
    render(<LoginButton />);
    expect(
      screen.getByRole('button', { name: '카카오로 시작하기' }),
    ).toBeInTheDocument();
  });

  it('allows overriding children', () => {
    render(<LoginButton>다른 텍스트</LoginButton>);
    expect(
      screen.getByRole('button', { name: '다른 텍스트' }),
    ).toBeInTheDocument();
  });

  it('handles click', () => {
    const handleClick = vi.fn();
    render(<LoginButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: '카카오로 시작하기' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is set', () => {
    render(<LoginButton disabled />);
    expect(
      screen.getByRole('button', { name: '카카오로 시작하기' }),
    ).toBeDisabled();
  });

  it('shows spinner and sets aria-busy when loading', () => {
    render(<LoginButton loading ariaLabel="로그인" />);
    const btn = screen.getByRole('button', { name: '로그인' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
  });

  it('toggles pressed state', () => {
    const handleChange = vi.fn();
    render(
      <ToggleLoginButton
        ariaLabel="로그인 토글"
        pressed={false}
        onPressedChange={handleChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '로그인 토글' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('applies login variant styles', () => {
    render(<LoginButton>로그인</LoginButton>);
    expect(screen.getByRole('button', { name: '로그인' })).toHaveStyle(
      `background: ${colors.brand.kakaoYellow}`,
    );
  });
});
