import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import TitleBar from '@/components/titleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

describe('TitleBar', () => {
  it('renders slots and title', () => {
    render(
      <TitleBar
        leftSlot={<button>Left</button>}
        title="Center"
        rightSlot={<button>Right</button>}
      />,
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    render(<TitleBar title="Center" />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle(`height: ${spacing.spacing14}`);
    expect(header).toHaveStyle(
      `border-bottom: 1px solid ${colors.border.default}`,
    );

    const title = screen.getByText('Center');
    expect(title).toHaveStyle(`font-size: 1.125rem`);
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );
  });
});
