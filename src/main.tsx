import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setupInterceptors } from '@/api/core/interceptors';
import { queryClient } from '@/api/core/queryClient';
import { bootstrapMSW } from '@/mocks/bootstrap';
import { registerNotifier } from '@/pages/notifications/notify';
import { router } from '@/routes/router';
import GlobalStyles from '@/styles/GlobalStyles.tsx';
import { theme } from '@/theme';

if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
  await bootstrapMSW();
}

// Axios 인터셉터 설정 (앱 시작 시 한 번만 실행)
setupInterceptors();

registerNotifier({
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
