import { render, screen, fireEvent } from '@testing-library/react';
import { FaThumbsUp } from 'react-icons/fa';
import { describe, it, expect, vi } from 'vitest';

import IconButton from '@/components/iconButton';
import { spacing } from '@/theme/spacing';

describe('IconButton', () => {
  it('renders icon children', () => {
    render(
      <IconButton ariaLabel="like">
        <FaThumbsUp />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument();
  });

  it('handles pressed state change', () => {
    const handleChange = vi.fn();
    render(
      <IconButton
        ariaLabel="toggle"
        pressed={false}
        onPressedChange={handleChange}
      >
        <FaThumbsUp />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('shows loading spinner and aria-busy', () => {
    render(
      <IconButton ariaLabel="loading" loading>
        <FaThumbsUp />
      </IconButton>,
    );
    const btn = screen.getByRole('button', { name: 'loading' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument();
  });

  it('applies spacing-based size', () => {
    render(
      <IconButton ariaLabel="size-test">
        <FaThumbsUp />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'size-test' })).toHaveStyle(
      `width: ${spacing.spacing10}`,
    );
  });
});
