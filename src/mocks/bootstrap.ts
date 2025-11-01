export async function bootstrapMSW() {
  if (import.meta.env.VITE_USE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('./browser');
  await worker.start({ onUnhandledRequest: 'error' });
}
