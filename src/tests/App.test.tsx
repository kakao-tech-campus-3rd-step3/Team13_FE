import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';

describe('App', () => {
  it('renders P-Ting text', () => {
    render(<App />);
    expect(screen.getByText(/P-Ting/i)).toBeInTheDocument();
  });
});
