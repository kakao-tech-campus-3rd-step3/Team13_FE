import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import GlobalStyle from '@/styles/GlobalStyles';

describe('GlobalStyle', () => {
  it('renders without crashing', () => {
    const { container } = render(<GlobalStyle />);
    expect(container).toBeDefined();
  });
});
