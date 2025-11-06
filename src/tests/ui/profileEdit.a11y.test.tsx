/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ProfileResponse, UpdateProfileRequest } from '@/api/profile';
import { getMyProfile, updateMyProfile } from '@/api/profile';
import ProfileEditPage from '@/pages/My/ProfileEditPage';
import { notify } from '@/pages/notifications/notify';
import { useAppStore } from '@/stores/appStore';
import { createUserEvent } from '@/tests/utils/userEvent';
import { theme } from '@/theme';

const baseProfile: ProfileResponse = {
  name: '김대영',
  email: 'kimdy@pusan.ac.kr',
  imageUrl: 'https://example.com/avatar/kimdaeyoung.png',
  description: '농구를 사랑하는 부산대생',
};

let currentProfile: ProfileResponse = structuredClone(baseProfile);

vi.mock('@/api/profile', async () => {
  const actual =
    await vi.importActual<typeof import('@/api/profile')>('@/api/profile');

  return {
    ...actual,
    getMyProfile: vi.fn(() => Promise.resolve(currentProfile)),
    updateMyProfile: vi.fn((payload: UpdateProfileRequest) => {
      currentProfile = {
        ...currentProfile,
        ...(typeof payload.name === 'string' ? { name: payload.name } : {}),
        ...(typeof payload.description === 'string'
          ? { description: payload.description }
          : {}),
        ...(typeof payload.imageUrl === 'string'
          ? { imageUrl: payload.imageUrl }
          : {}),
      } satisfies ProfileResponse;

      return Promise.resolve(currentProfile);
    }),
  } satisfies typeof import('@/api/profile');
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false },
    },
  });

let queryClient: QueryClient;

const renderProfileEdit = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/my/profile/edit']}>
          <Routes>
            <Route path="/my/profile/edit" element={<ProfileEditPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );

const waitForReactQueryIdle = async () => {
  await waitFor(() => {
    expect(queryClient.isFetching()).toBe(0);
    expect(queryClient.isMutating()).toBe(0);
  });
};

describe('ProfileEditPage 접근성 및 상호작용', () => {
  beforeEach(() => {
    currentProfile = structuredClone(baseProfile);
    queryClient = createTestQueryClient();

    act(() => {
      useAppStore.setState((state) => ({
        ...state,
        hasHydrated: true,
        user: {
          id: 101,
          name: baseProfile.name,
          email: baseProfile.email,
          avatarUrl: baseProfile.imageUrl,
        },
      }));
    });

    vi.spyOn(notify, 'success').mockImplementation(() => undefined);
    vi.spyOn(notify, 'error').mockImplementation(() => undefined);
    vi.spyOn(notify, 'info').mockImplementation(() => undefined);
  });

  afterEach(() => {
    if (queryClient) {
      queryClient.clear();
      queryClient.getQueryCache().clear();
      queryClient.getMutationCache().clear();
    }
    vi.restoreAllMocks();
    act(() => {
      useAppStore.setState((state) => ({
        ...state,
        hasHydrated: false,
        user: null,
      }));
    });
  });

  it('빈 값 제출 시 aria-invalid, 에러 메시지, 포커스를 설정한다', async () => {
    renderProfileEdit();

    const nicknameInput = await screen.findByLabelText('닉네임');
    fireEvent.change(nicknameInput, { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: '저장' }));

    await waitForReactQueryIdle();

    await waitFor(() => {
      expect(nicknameInput).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('필수 입력 항목입니다.')).toBeInTheDocument();
      expect(document.activeElement).toBe(nicknameInput);
    });
  });

  it('닉네임을 변경하면 성공 알림과 함께 값이 반영된다', async () => {
    renderProfileEdit();

    const nicknameInput = await screen.findByLabelText('닉네임');
    fireEvent.change(nicknameInput, { target: { value: '프리미엄 유저' } });

    fireEvent.click(screen.getByRole('button', { name: '저장' }));

    await waitForReactQueryIdle();

    await waitFor(() => {
      expect(notify.success).toHaveBeenCalledWith('저장 완료!');
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('프리미엄 유저')).toBeInTheDocument();
    });

    expect(useAppStore.getState().user?.name).toBe('프리미엄 유저');
    expect(vi.mocked(updateMyProfile).mock.calls[0]?.[0]).toEqual({
      name: '프리미엄 유저',
    });
    expect(vi.mocked(getMyProfile)).toHaveBeenCalled();
  });

  it('Tab 키로 이동하고 Enter로 제출할 수 있다', async () => {
    renderProfileEdit();

    const user = createUserEvent();

    const nicknameInput = await screen.findByLabelText('닉네임');
    act(() => {
      fireEvent.change(nicknameInput, { target: { value: '' } });
      nicknameInput.focus();
    });
    act(() => {
      user.type(nicknameInput, '탭사용자');
    });

    act(() => {
      user.tab();
    });
    const emailInput = screen.getByLabelText('이메일');
    expect(document.activeElement).toBe(emailInput);

    act(() => {
      user.tab();
    });
    const descriptionField = screen.getByLabelText('소개');
    expect(document.activeElement).toBe(descriptionField);
    act(() => {
      user.type(descriptionField, '탭으로 수정했습니다.');
    });

    act(() => {
      user.tab();
    });
    const imageUrlField = screen.getByLabelText('프로필 이미지 URL');
    expect(document.activeElement).toBe(imageUrlField);

    act(() => {
      user.tab();
    });
    const cancelButton = screen.getByRole('button', { name: '취소' });
    expect(document.activeElement).toBe(cancelButton);

    act(() => {
      user.tab();
    });
    const submitButton = screen.getByRole('button', { name: '저장' });
    expect(document.activeElement).toBe(submitButton);

    act(() => {
      user.keyboard('{Enter}');
    });

    await waitForReactQueryIdle();

    await waitFor(() => {
      expect(notify.success).toHaveBeenCalledWith('저장 완료!');
    });
  });
});
