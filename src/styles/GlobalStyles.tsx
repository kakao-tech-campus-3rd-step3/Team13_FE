import { Global, css } from '@emotion/react';
import React from 'react';
import '@fontsource/pretendard';

// 전부 임시 AI css 코드
const spacing = {
  spacing0: 0,
  spacing4: '1rem', // 16px
};

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
      body,
      #root {
        height: 100%;
      }

      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        font-family: 'Pretendard', sans-serif;
        background-color: #f0f2f5; // 앱 전체 배경색
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
        min-height: 100%;
        margin: 0 auto;
        padding: 0 ${spacing.spacing4};
        background-color: #ffffff; // 메인 컨텐츠 영역
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 15px; // 그림자 효과
      }

      a,
      button {
        -webkit-tap-highlight-color: transparent; // 모바일 터치 경험 개선
      }

      input,
      button,
      textarea {
        font-family: inherit; // 폼 요소 폰트 통일
      }

      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #c4c4c4;
        border-radius: 6px;
      }
      ::-webkit-scrollbar-track {
        background-color: #f0f2f5;
      }
    `}
  />
);

export default GlobalStyle;
