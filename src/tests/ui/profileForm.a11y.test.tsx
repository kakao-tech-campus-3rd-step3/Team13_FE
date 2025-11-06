/* @vitest-environment jsdom */

import { ThemeProvider } from '@emotion/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import ProfileFormDemo from '@/pages/Forms/ProfileFormDemo';
import { useAppStore } from '@/stores/appStore';
import { theme } from '@/theme';

describe('ProfileFormDemo 접근성', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn> | null = null;

  beforeAll(() => {
    const originalError = console.error;
    consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((message?: unknown, ...rest: unknown[]) => {
        if (
          typeof message === 'string' &&
          message.includes('not wrapped in act')
        ) {
          return;
        }

        originalError(message as string, ...rest);
      });
  });

  afterEach(() => {
    useAppStore.setState((state) => ({ ...state, hasHydrated: false }));
  });

  beforeEach(() => {
    useAppStore.setState((state) => ({ ...state, hasHydrated: true }));
  });

  afterAll(() => {
    consoleErrorSpy?.mockRestore();
  });

  const renderForm = () =>
    render(
      <ThemeProvider theme={theme}>
        <ProfileFormDemo />
      </ThemeProvider>,
    );

  it('빈 값 제출 시 aria 속성과 에러, 포커스 상태를 정확히 제어', async () => {
    renderForm();

    const submitButton = screen.getByRole('button', { name: 'submit' });
    await act(async () => {
      fireEvent.click(submitButton);
      await Promise.resolve();
    });

    const input = await screen.findByLabelText('닉네임');
    const errors = await screen.findAllByText('필수 입력 항목입니다.');
    const hint = screen.getByText(
      '31자 이내로 설정하면 추천 친구 목록에 멋지게 노출돼요.',
    );

    expect(input.getAttribute('aria-describedby')).toContain('nickname-hint');
    expect(input.getAttribute('aria-describedby')).toContain('nickname-error');
    expect(hint.id).toBe('nickname-hint');

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toBeInTheDocument();

    await waitFor(() => {
      expect(document.activeElement).toBe(input);
    });
  });

  it('초기화 버튼으로 값과 에러 상태를 재설정', async () => {
    renderForm();

    const nickname = screen.getByLabelText<HTMLInputElement>('닉네임');
    const email = screen.getByLabelText<HTMLInputElement>('이메일');

    fireEvent.change(nickname, { target: { value: '홍길동' } });
    fireEvent.change(email, { target: { value: 'invalid-email' } });

    await act(async () => {
      fireEvent.blur(email);
      await Promise.resolve();
    });

    expect(nickname.value).toBe('홍길동');

    const resetButton = screen.getByRole('button', { name: 'reset' });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(nickname.value).toBe('');
      expect(email.value).toBe('');
      expect(screen.queryByText('필수 입력 항목입니다.')).toBeNull();
    });
  });
});
