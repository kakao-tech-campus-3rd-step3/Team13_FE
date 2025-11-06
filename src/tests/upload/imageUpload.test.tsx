/* @vitest-environment jsdom */
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/features/upload/services/presign', () => ({
  requestImagePresign: vi.fn(),
}));

vi.mock('@/features/upload/services/uploader', () => ({
  uploadViaPresignedUrl: vi.fn(),
}));

import ImageUploader from '@/features/upload/components/ImageUploader';
import { requestImagePresign } from '@/features/upload/services/presign';
import { uploadViaPresignedUrl } from '@/features/upload/services/uploader';
import { notify } from '@/pages/notifications/notify';
import { theme } from '@/theme';

const presignMock = vi.mocked(requestImagePresign);
const uploadMock = vi.mocked(uploadViaPresignedUrl);

const createFile = (name: string, size: number, type: string) =>
  new File([new Uint8Array(size)], name, { type });

const originalCreateImageBitmap = globalThis.createImageBitmap;
const hasOriginalCreateObjectURL = typeof URL.createObjectURL === 'function';
const originalCreateObjectURL = hasOriginalCreateObjectURL
  ? URL.createObjectURL.bind(URL)
  : undefined;
const hasOriginalRevokeObjectURL = typeof URL.revokeObjectURL === 'function';
const originalRevokeObjectURL = hasOriginalRevokeObjectURL
  ? URL.revokeObjectURL.bind(URL)
  : undefined;

describe('ImageUploader', () => {
  beforeEach(() => {
    (
      globalThis as unknown as { createImageBitmap: typeof createImageBitmap }
    ).createImageBitmap = vi.fn(() =>
      Promise.resolve({ width: 256, height: 256 }),
    ) as unknown as typeof createImageBitmap;

    presignMock.mockResolvedValue({
      uploadUrl: 'https://uploads.example.com/put/mock',
      publicUrl: 'https://cdn.example.com/uploads/mock-avatar.png',
      requiredHeaders: { 'Content-Type': 'image/png' },
    });

    uploadMock.mockImplementation((presign, file, options) => {
      options?.onProgress?.({
        loaded: file.size,
        total: file.size,
        percent: 100,
      });
      return Promise.resolve(presign.publicUrl);
    });

    if (hasOriginalCreateObjectURL && originalCreateObjectURL) {
      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob://preview');
    } else {
      urlWithOptional.createObjectURL = vi
        .fn(() => 'blob://preview')
        .mockName('createObjectURL');
    }

    if (hasOriginalRevokeObjectURL && originalRevokeObjectURL) {
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    } else {
      urlWithOptional.revokeObjectURL = vi
        .fn(() => undefined)
        .mockName('revokeObjectURL');
    }

    vi.spyOn(notify, 'success').mockImplementation(() => undefined);
    vi.spyOn(notify, 'error').mockImplementation(() => undefined);
    vi.spyOn(notify, 'info').mockImplementation(() => undefined);
    vi.spyOn(notify, 'warning').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    presignMock.mockReset();
    uploadMock.mockReset();

    if (originalCreateImageBitmap) {
      (
        globalThis as unknown as { createImageBitmap: typeof createImageBitmap }
      ).createImageBitmap = originalCreateImageBitmap;
    } else {
      delete (globalThis as { createImageBitmap?: typeof createImageBitmap })
        .createImageBitmap;
    }

    if (!hasOriginalCreateObjectURL) {
      delete (URL as { createObjectURL?: typeof URL.createObjectURL })
        .createObjectURL;
    }

    if (!hasOriginalRevokeObjectURL) {
      delete (URL as { revokeObjectURL?: typeof URL.revokeObjectURL })
        .revokeObjectURL;
    }
  });

  const renderUploader = (
    props?: Partial<ComponentProps<typeof ImageUploader>>,
  ) =>
    render(
      <ThemeProvider theme={theme}>
        <ImageUploader
          label={props?.label ?? '프로필 이미지'}
          description={props?.description ?? '10MB 이하 · JPG/PNG/WEBP'}
          onUploaded={props?.onUploaded}
        />
      </ThemeProvider>,
    );

  it('10MB를 초과하는 파일은 거부한다', async () => {
    const { container } = renderUploader();
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const largeFile = createFile('large.png', 11 * 1024 * 1024, 'image/png');

    fireEvent.change(input, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(notify.error).toHaveBeenCalledWith(
        '10MB 이하 이미지만 업로드할 수 있어요.',
      );
    });

    expect(
      await screen.findByText('10MB 이하 이미지만 업로드할 수 있어요.'),
    ).toBeInTheDocument();
  });

  it('정상적으로 업로드하고 성공 메시지를 표시한다', async () => {
    const handleUploaded = vi.fn();
    const { container } = renderUploader({ onUploaded: handleUploaded });
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = createFile('avatar.png', 1024, 'image/png');

    fireEvent.change(input, { target: { files: [file] } });

    const uploadButton = await screen.findByRole('button', {
      name: '이미지 업로드',
    });
    await waitFor(() => {
      expect(uploadButton).not.toBeDisabled();
    });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(notify.success).toHaveBeenCalledWith('이미지가 업로드되었어요.');
    });

    expect(handleUploaded).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/cdn\.example\.com\/uploads\//),
      expect.anything(),
    );
    expect(
      screen.getByText('이미지가 성공적으로 업로드되었어요!'),
    ).toBeInTheDocument();
  });

  it('업로드 중 취소할 수 있다', async () => {
    const { container } = renderUploader();
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = createFile('avatar.png', 1024, 'image/png');

    fireEvent.change(input, { target: { files: [file] } });

    uploadMock.mockImplementationOnce(
      (presign, uploadFile, options) =>
        new Promise<string>((resolve, reject) => {
          const timer = setTimeout(() => {
            options?.onProgress?.({
              loaded: uploadFile.size,
              total: uploadFile.size,
              percent: 100,
            });
            resolve(presign.publicUrl);
          }, 500);

          options?.signal?.addEventListener('abort', () => {
            clearTimeout(timer);
            reject(new Error('aborted'));
          });
        }),
    );

    const uploadButton = await screen.findByRole('button', {
      name: '이미지 업로드',
    });
    await waitFor(() => {
      expect(uploadButton).not.toBeDisabled();
    });
    fireEvent.click(uploadButton);

    const cancelButton = await screen.findByRole('button', {
      name: '업로드 취소',
    });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(notify.info).toHaveBeenCalledWith('업로드가 취소되었어요.');
    });

    expect(screen.getByText('⚠️ 업로드가 취소되었어요.')).toBeInTheDocument();
  });
});
