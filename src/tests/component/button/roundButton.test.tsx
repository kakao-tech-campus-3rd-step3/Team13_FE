import { render, screen, fireEvent } from '@testing-library/react';
import { FaThumbsUp } from 'react-icons/fa';
import { describe, it, expect, vi } from 'vitest';

import { RoundButton, ToggleRoundButton } from '@/components/button';
import { spacing } from '@/theme/spacing';

describe('RoundButton', () => {
  it('renders icon child', () => {
    render(
      <RoundButton ariaLabel="like">
        <FaThumbsUp />
      </RoundButton>,
    );
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument();
  });

  it('handles pressed state change', () => {
    const handleChange = vi.fn();
    render(
      <ToggleRoundButton
        ariaLabel="toggle"
        pressed={false}
        onPressedChange={handleChange}
      >
        <FaThumbsUp />
      </ToggleRoundButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('shows loading spinner and aria-busy', () => {
    render(
      <RoundButton ariaLabel="loading" loading>
        <FaThumbsUp />
      </RoundButton>,
    );
    const btn = screen.getByRole('button', { name: 'loading' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
  });

  it('applies md and lg size styles', () => {
    const { rerender } = render(<RoundButton ariaLabel="size-md" size="md" />);
    const mdButton = screen.getByRole('button', { name: 'size-md' });
    expect(mdButton).toHaveStyle(`width: ${spacing.spacing12}`);
    expect(mdButton).toHaveStyle(`height: ${spacing.spacing12}`);

    rerender(<RoundButton ariaLabel="size-lg" size="lg" />);
    const lgButton = screen.getByRole('button', { name: 'size-lg' });
    expect(lgButton).toHaveStyle(`width: ${spacing.spacing16}`);
    expect(lgButton).toHaveStyle(`height: ${spacing.spacing16}`);
  });

  it('is disabled when disabled prop is set', () => {
    render(<RoundButton ariaLabel="disabled" disabled />);
    expect(screen.getByRole('button', { name: 'disabled' })).toBeDisabled();
  });
});
