import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import GlobalStyle from '@/styles/GlobalStyles';

describe('GlobalStyle 컴포넌트', () => {
  it('오류 없이 렌더링된다', () => {
    const { container } = render(<GlobalStyle />);
    expect(container).toBeDefined();
  });
});
