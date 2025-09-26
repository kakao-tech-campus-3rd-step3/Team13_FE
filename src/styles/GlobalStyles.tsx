import { Global, css } from '@emotion/react';
import React from 'react';

import '@fontsource/pretendard';
import { colors } from '@/theme/color';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

const GlobalStyle = (): React.ReactElement => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: ${spacing.spacing0};
        padding: ${spacing.spacing0};
      }

      html,
      body {
        height: 100%;
      }

      #root {
        min-height: 100vh;
      }

      body {
        ${typography.body1Regular};
        -webkit-font-smoothing: antialiased;
        font-family: 'Pretendard', sans-serif;
        background-color: ${colors.background.fill};
        color: ${colors.text.default};
      }

      ol,
      ul,
      menu {
        list-style: none;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      #root {
        position: relative;
        max-width: 720px;
        min-height: 100vh; /* 최소 높이만 뷰포트 높이로 설정 */
        margin: 0 auto;
        padding: 0 ${spacing.spacing4};
        background-color: ${colors.background.default};
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 15px;
      }

      a,
      button {
        -webkit-tap-highlight-color: transparent;
      }

      input,
      button,
      textarea {
        font-family: inherit;
      }

      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${colors.gray[500]};
        border-radius: 6px;
      }
      ::-webkit-scrollbar-track {
        background-color: ${colors.background.fill};
      }
    `}
  />
);

export default GlobalStyle;
