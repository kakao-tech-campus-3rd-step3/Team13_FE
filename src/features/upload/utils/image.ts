const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('IMAGE_LOAD_ERROR'));
    image.src = src;
  });

export async function readImageDimensions(
  file: File,
): Promise<{ width?: number; height?: number }> {
  const objectUrl = URL.createObjectURL(file);

  try {
    if (typeof createImageBitmap === 'function') {
      const bitmap = await createImageBitmap(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };

      try {
        bitmap.close();
      } catch {
        // 비트맵 해제 실패는 무시합니다.
      }

      return dimensions;
    }

    const image = await loadImage(objectUrl);

    return {
      width: image.naturalWidth || undefined,
      height: image.naturalHeight || undefined,
    };
  } catch {
    return { width: undefined, height: undefined };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function toObjectUrl(file: File) {
  return URL.createObjectURL(file);
}

export function revokeObjectUrl(url?: string) {
  if (!url) return;
  URL.revokeObjectURL(url);
}
