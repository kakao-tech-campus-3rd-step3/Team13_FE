/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import GoogleButton from '@/features/auth/components/GoogleButton';
import { resolveOAuthState } from '@/features/auth/utils/oauthState';
import { theme } from '@/theme';

const renderButton = (state: unknown) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[{ pathname: '/login', state }]}>
        <GoogleButton />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('GoogleButton', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, assign: vi.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('구글 인증 URL로 이동하며 state에 from 정보를 포함한다', async () => {
    renderButton({ from: { pathname: '/home', search: '?tab=team' } });

    const location = window.location as typeof window.location & {
      assign: ReturnType<typeof vi.fn>;
    };

    fireEvent.click(screen.getByRole('button', { name: 'google-login' }));

    await waitFor(() => {
      expect(location.assign).toHaveBeenCalledTimes(1);
    });

    const [[redirect]] = location.assign.mock.calls as [[string | URL]];
    const redirectUrl = new URL(redirect.toString());
    const rawState = redirectUrl.searchParams.get('state');
    expect(rawState).toBeTruthy();

    const resolved = resolveOAuthState(rawState, '/fallback');
    expect(resolved).toBe('/home?tab=team');
  });
});
