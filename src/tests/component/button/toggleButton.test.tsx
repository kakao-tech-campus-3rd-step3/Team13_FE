import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps, MouseEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ToggleButton } from '@/components/button';

const renderToggle = (
  props: Partial<ComponentProps<typeof ToggleButton>> = {},
) =>
  render(
    <ToggleButton
      variant="icon"
      ariaLabel="좋아요"
      pressed={false}
      onPressedChange={() => {}}
      {...props}
    >
      🤍
    </ToggleButton>,
  );

describe('ToggleButton 컴포넌트', () => {
  it('클릭 시 pressed 상태를 토글한다', () => {
    const handleChange = vi.fn();
    renderToggle({ onPressedChange: handleChange });

    fireEvent.click(screen.getByRole('button', { name: '좋아요' }));

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('pressed 상태를 aria-pressed 속성으로 노출한다', () => {
    renderToggle({ pressed: true });

    expect(screen.getByRole('button', { name: '좋아요' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('disabled 상태에서는 pressed 변경 콜백을 호출하지 않는다', () => {
    const handleChange = vi.fn();
    renderToggle({ onPressedChange: handleChange, disabled: true });

    fireEvent.click(screen.getByRole('button', { name: '좋아요' }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('loading 상태에서는 버튼이 비활성화되고 pressed 변경 콜백을 호출하지 않는다', () => {
    const handleChange = vi.fn();
    renderToggle({ onPressedChange: handleChange, loading: true });

    const button = screen.getByRole('button', { name: '좋아요' });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('onClick 핸들러가 기본 동작을 취소하면 pressed 상태가 변경되지 않는다', () => {
    const handleClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    });
    const handleChange = vi.fn();
    renderToggle({ onClick: handleClick, onPressedChange: handleChange });

    fireEvent.click(screen.getByRole('button', { name: '좋아요' }));

    expect(handleClick).toHaveBeenCalled();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
