import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from '@/components/button';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';

describe('Button 컴포넌트', () => {
  it('자식 요소를 렌더링한다', () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole('button', { name: '버튼' })).toBeInTheDocument();
  });

  it('클릭 이벤트를 처리한다', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    fireEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disabled 속성이 설정되면 비활성화된다', () => {
    render(<Button disabled>비활성</Button>);
    expect(screen.getByRole('button', { name: '비활성' })).toBeDisabled();
  });

  it('임의의 aria 속성을 전달한다', () => {
    render(
      <Button aria-label="추가" aria-describedby="도움말">
        텍스트
      </Button>,
    );
    expect(screen.getByRole('button', { name: '추가' })).toHaveAttribute(
      'aria-describedby',
      '도움말',
    );
  });

  it('로딩 중 스피너를 표시하고 aria-busy를 설정한다', () => {
    render(<Button loading ariaLabel="로딩 버튼" />);
    const btn = screen.getByRole('button', { name: '로딩 버튼' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: '로딩 중' })).toBeInTheDocument();
  });

  it('icon 변형에서 ariaLabel이 없으면 경고를 출력한다', () => {
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    render(<Button variant="icon">아이콘</Button>);

    expect(warnSpy).toHaveBeenCalledWith(
      '[Button] `icon` variant requires `ariaLabel` for accessibility.',
    );
    warnSpy.mockRestore();
  });

  it('로딩 중에는 data-loading 속성과 disabled 속성을 설정한다', () => {
    const handleClick = vi.fn();

    render(
      <Button loading ariaLabel="로딩" onClick={handleClick}>
        로딩
      </Button>,
    );

    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toHaveAttribute('data-loading', 'true');
    expect(btn).toBeDisabled();

    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('프라이머리 변형 스타일을 적용한다', () => {
    render(<Button variant="primary">스타일</Button>);
    expect(screen.getByRole('button', { name: '스타일' })).toHaveStyle(
      `background: ${colors.brand.kakaoYellow}`,
    );
  });

  it('라지 크기 패딩을 적용한다', () => {
    render(<Button size="lg">큰 버튼</Button>);
    expect(screen.getByRole('button', { name: '큰 버튼' })).toHaveStyle(
      `padding: ${spacing.spacing4} ${spacing.spacing6}`,
    );
  });
});
