/* @vitest-environment jsdom */

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useUpdateProfile } from '@/hooks/mutations/profile';
import { useProfileQuery } from '@/hooks/queries/profile';
import { resetProfileState } from '@/mocks/handlers/profile';
import { server } from '@/mocks/server';
import { registerNotifier } from '@/pages/notifications/notify';
import { useAppStore } from '@/stores/appStore';
import { theme } from '@/theme';

function ProfileHarness() {
  const { data } = useProfileQuery();
  const mutation = useUpdateProfile();

  return (
    <div>
      <span aria-label="profile-name">{data?.name ?? ''}</span>
      <button type="button" onClick={() => mutation.mutate({ name: '홍길동' })}>
        update-success
      </button>
      <button type="button" onClick={() => mutation.mutate({ name: '실패' })}>
        update-fail
      </button>
    </div>
  );
}

const renderWithProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 0 },
      mutations: { retry: 0 },
    },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProfileHarness />
      </QueryClientProvider>
    </ThemeProvider>,
  );
};

describe('useUpdateProfile', () => {
  const success = vi.fn();
  const error = vi.fn();

  beforeEach(() => {
    resetProfileState();
    window.localStorage.clear();
    useAppStore.getState().actions.resetAll();
    registerNotifier({
      success,
      error,
      info: vi.fn(),
      warning: vi.fn(),
    });
    success.mockReset();
    error.mockReset();
  });

  it('낙관적 업데이트 후 성공 응답을 확정한다', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByLabelText('profile-name').textContent).not.toBe('');
    });

    fireEvent.click(screen.getByText('update-success'));

    await waitFor(() => {
      expect(screen.getByLabelText('profile-name').textContent).toBe('홍길동');
    });

    expect(success).toHaveBeenCalledWith('저장 완료!');

    expect(error).not.toHaveBeenCalled();
  });

  it('실패 시 낙관적 상태를 롤백하고 에러 토스트를 노출한다', async () => {
    server.use(
      http.patch('*/api/v1/members/me/profile/name', async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json('error', { status: 500 });
      }),
    );

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByLabelText('profile-name').textContent).not.toBe('');
    });

    const initialName = screen.getByLabelText('profile-name').textContent ?? '';

    fireEvent.click(screen.getByText('update-fail'));

    await waitFor(() => {
      expect(screen.getByLabelText('profile-name').textContent).toBe('실패');
    });

    await waitFor(() => {
      expect(screen.getByLabelText('profile-name').textContent).toBe(
        initialName,
      );
      expect(error).toHaveBeenCalledWith(
        '저장에 실패했어요. 네트워크 상태를 확인해 주세요.',
      );
    });

    expect(success).not.toHaveBeenCalled();
  });
});
