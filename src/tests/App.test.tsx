import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';

describe('App 컴포넌트', () => {
  it('홈 페이지를 렌더링한다', () => {
    render(<App />);
    expect(screen.getByText('Demo Home Page')).toBeInTheDocument();
  });
});
