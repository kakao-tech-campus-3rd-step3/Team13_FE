import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

describe('OriginTitleBar', () => {
  it('renders title and back button', () => {
    const handleBack = vi.fn();
    render(<OriginTitleBar title="Origin" onBack={handleBack} />);

    const backButton = screen.getByLabelText('뒤로 가기');
    expect(backButton).toBeInTheDocument();
    expect(screen.getByText('Origin')).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(handleBack).toHaveBeenCalled();
  });

  it('applies styles and has empty right slot', () => {
    render(<OriginTitleBar title="Origin" onBack={() => {}} />);

    const backButton = screen.getByLabelText('뒤로 가기');
    expect(backButton).toHaveStyle(`width: ${spacing.spacing10}`);
    expect(backButton).toHaveStyle(`color: ${colors.text.default}`);

    const icon = backButton.firstChild as HTMLElement;
    expect(icon).toHaveStyle(`color: ${colors.text.default}`);

    const title = screen.getByText('Origin');
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );

    const header = screen.getByRole('banner');
    expect(header.lastChild).toBeEmptyDOMElement();
  });
});
