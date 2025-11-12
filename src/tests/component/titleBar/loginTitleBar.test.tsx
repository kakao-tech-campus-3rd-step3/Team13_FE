import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import LoginTitleBar from '@/components/titleBar/loginTitleBar';
import { typography } from '@/theme/typography';

describe('LoginTitleBar 컴포넌트', () => {
  it('제목을 렌더링한다', () => {
    render(<LoginTitleBar />);
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('좌측 슬롯은 비어 있고 우측 슬롯에는 프로필 아이콘이 있다', () => {
    render(<LoginTitleBar />);
    const header = screen.getByRole('banner');
    expect(header.firstChild).toBeEmptyDOMElement();
    expect(header.lastChild).not.toBeEmptyDOMElement();
  });

  it('스타일이 적용된다', () => {
    render(<LoginTitleBar />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('background: rgba(255, 255, 255, 0.95)');
    expect(header).toHaveStyle('position: sticky');

    const title = screen.getByText('로그인');
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );
  });
});
