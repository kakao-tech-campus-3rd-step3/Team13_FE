import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import LoginTitleBar from '@/components/loginTitleBar';
import { colors } from '@/theme/color';
import { typography } from '@/theme/typography';

describe('LoginTitleBar', () => {
  it('제목을 렌더링한다', () => {
    render(<LoginTitleBar />);
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('좌우 슬롯이 비어 있다', () => {
    render(<LoginTitleBar />);
    const header = screen.getByRole('banner');
    expect(header.firstChild).toBeEmptyDOMElement();
    expect(header.lastChild).toBeEmptyDOMElement();
  });

  it('스타일이 적용된다', () => {
    render(<LoginTitleBar />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle(
      `background-color: ${colors.background.default}`,
    );

    const title = screen.getByText('로그인');
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );
  });
});
