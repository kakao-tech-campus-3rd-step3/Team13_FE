/* @vitest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AuthProviderButton } from '@/features/auth/components/AuthProviderButton';

describe('<AuthProviderButton />', () => {
  it('구글 버튼이 올바른 라벨과 아이콘으로 렌더링된다', () => {
    render(<AuthProviderButton provider="google" />);

    expect(
      screen.getByRole('button', { name: /google로 계속하기/i }),
    ).toBeInTheDocument();
  });

  it('카카오 버튼도 렌더링된다', () => {
    render(<AuthProviderButton provider="kakao" />);

    expect(
      screen.getByRole('button', { name: /카카오로 계속하기/i }),
    ).toBeInTheDocument();
  });

  it('로딩 상태에서는 비활성화되고 라벨이 변경된다', () => {
    render(<AuthProviderButton provider="google" loading />);

    const button = screen.getByRole('button', { name: /google로 계속하기/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('연결 중…')).toBeInTheDocument();
  });

  it('클릭 이벤트가 호출된다', () => {
    const onClick = vi.fn();
    render(<AuthProviderButton provider="google" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: /google로 계속하기/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
