import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import InputTextWithEmail from '@/components/inputTextWithEmail';

describe('InputTextWithEmail', () => {
  it('renders default domain', () => {
    render(<InputTextWithEmail />);
    const select = screen.getByLabelText('email domain select');
    expect(select).toHaveValue('pusan.ac.kr');
    expect(
      screen.getByRole('option', { name: '직접입력' }),
    ).toBeInTheDocument();
  });

  it('calls onChange with default domain', () => {
    const handleChange = vi.fn();
    render(<InputTextWithEmail onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('email local part'), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenLastCalledWith('test@pusan.ac.kr');
  });

  it('allows custom domain input', () => {
    const handleChange = vi.fn();
    render(<InputTextWithEmail onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('email domain select'), {
      target: { value: 'other' },
    });
    fireEvent.change(screen.getByLabelText('email domain input'), {
      target: { value: 'gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('email local part'), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenLastCalledWith('test@gmail.com');
  });

  it('shows helper text', () => {
    render(<InputTextWithEmail helperText="이메일을 입력하세요" />);
    expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
  });
});
