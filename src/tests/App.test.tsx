import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';

describe('App', () => {
  it('renders email input component', () => {
    render(<App />);
    expect(screen.getByLabelText(/email local part/i)).toBeInTheDocument();
  });
});
