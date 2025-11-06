import { http, HttpResponse, delay } from 'msw';

type PresignRequest = {
  filename?: string;
  contentType?: string;
  size?: number;
  scope?: string;
};

const presignUpload = http.post<never, PresignRequest>(
  '*/api/v1/uploads/presign',
  async ({ request }) => {
    const body = ((await request.json().catch(() => ({}))) ??
      {}) as PresignRequest;
    const filename = body.filename ?? 'image.jpg';
    const contentType = body.contentType ?? 'image/jpeg';

    const id = Math.random().toString(36).slice(2, 10);
    const uploadUrl = `https://uploads.example.com/put/${id}`;
    const publicUrl = `https://cdn.example.com/uploads/${id}-${filename}`;

    return HttpResponse.json({
      uploadUrl,
      publicUrl,
      requiredHeaders: {
        'Content-Type': contentType,
        'x-amz-acl': 'public-read',
      },
    });
  },
);

const putUpload = http.put('https://uploads.example.com/put/:id', async () => {
  await delay(400);
  return new HttpResponse(null, { status: 200 });
});

export const uploadHandlers = [presignUpload, putUpload];
