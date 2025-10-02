import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import LoginButton, {
  ToggleLoginButton,
} from '@/components/button/loginButton';
import { colors } from '@/theme/color';

describe('LoginButton 컴포넌트', () => {
  it('기본 텍스트를 렌더링한다', () => {
    render(<LoginButton />);
    expect(
      screen.getByRole('button', { name: '카카오로 시작하기' }),
    ).toBeInTheDocument();
  });

  it('자식 요소를 덮어쓸 수 있다', () => {
    render(<LoginButton>다른 텍스트</LoginButton>);
    expect(
      screen.getByRole('button', { name: '다른 텍스트' }),
    ).toBeInTheDocument();
  });

  it('클릭을 처리한다', () => {
    const handleClick = vi.fn();
    render(<LoginButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: '카카오로 시작하기' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disabled 속성이 설정되면 비활성화된다', () => {
    render(<LoginButton disabled />);
    expect(
      screen.getByRole('button', { name: '카카오로 시작하기' }),
    ).toBeDisabled();
  });

  it('로딩 중 스피너를 표시하고 aria-busy를 설정한다', () => {
    render(<LoginButton loading ariaLabel="로그인" />);
    const btn = screen.getByRole('button', { name: '로그인' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('pressed 상태를 전환한다', () => {
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

  it('login 변형 스타일을 적용한다', () => {
    render(<LoginButton>로그인</LoginButton>);
    expect(screen.getByRole('button', { name: '로그인' })).toHaveStyle(
      `background: ${colors.brand.kakaoYellow}`,
    );
  });
});
