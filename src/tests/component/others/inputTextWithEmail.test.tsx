import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';

import InputTextWithEmail from '@/components/inputTextWithEmail';
const DEFAULT_DOMAIN = 'pusan.ac.kr';

const ControlledInputTextWithEmail = ({
  initialValue = `@${DEFAULT_DOMAIN}`,
  onChange = () => {},
  helperText,
}: {
  initialValue?: string;
  onChange?: (value: string) => void;
  helperText?: string;
}) => {
  const [email, setEmail] = useState(initialValue);

  const handleChange = (nextValue: string) => {
    setEmail(nextValue);
    onChange(nextValue);
  };

  return (
    <InputTextWithEmail
      value={email}
      onChange={handleChange}
      helperText={helperText}
    />
  );
};

describe('InputTextWithEmail 컴포넌트', () => {
  it('기본 도메인을 렌더링한다', () => {
    render(<ControlledInputTextWithEmail />);
    const select = screen.getByLabelText('이메일 도메인 선택');
    expect(select).toHaveValue('pusan.ac.kr');
    expect(
      screen.getByRole('option', { name: '직접입력' }),
    ).toBeInTheDocument();
  });

  it('기본 도메인으로 onChange를 호출한다', () => {
    const handleChange = vi.fn();
    render(
      <ControlledInputTextWithEmail
        onChange={handleChange}
        initialValue={`@${DEFAULT_DOMAIN}`}
      />,
    );
    fireEvent.change(screen.getByLabelText('이메일 아이디 입력'), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenLastCalledWith('test@pusan.ac.kr');
  });

  it('사용자가 도메인을 직접 입력할 수 있다', () => {
    const handleChange = vi.fn();
    render(
      <ControlledInputTextWithEmail
        onChange={handleChange}
        initialValue={`@${DEFAULT_DOMAIN}`}
      />,
    );
    fireEvent.change(screen.getByLabelText('이메일 도메인 선택'), {
      target: { value: 'other' },
    });
    fireEvent.change(screen.getByLabelText('이메일 도메인 입력'), {
      target: { value: 'gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('이메일 아이디 입력'), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenLastCalledWith('test@gmail.com');
  });

  it('헬퍼 텍스트를 표시한다', () => {
    render(<ControlledInputTextWithEmail helperText="이메일을 입력하세요" />);
    expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
  });
});
