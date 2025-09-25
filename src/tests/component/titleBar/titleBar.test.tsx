import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import TitleBar from '@/components/titleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

describe('TitleBar 컴포넌트', () => {
  it('슬롯과 제목을 렌더링한다', () => {
    render(
      <TitleBar
        leftSlot={<button>왼쪽</button>}
        title="가운데"
        rightSlot={<button>오른쪽</button>}
      />,
    );
    expect(screen.getByText('왼쪽')).toBeInTheDocument();
    expect(screen.getByText('가운데')).toBeInTheDocument();
    expect(screen.getByText('오른쪽')).toBeInTheDocument();
  });

  it('올바른 스타일을 적용한다', () => {
    render(<TitleBar title="가운데" />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle(`height: ${spacing.spacing14}`);
    expect(header).toHaveStyle(
      `border-bottom: 1px solid ${colors.border.default}`,
    );

    const title = screen.getByText('가운데');
    expect(title).toHaveStyle(`font-size: 1.125rem`);
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );
  });
});
