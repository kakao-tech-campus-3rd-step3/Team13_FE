import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '@/App';

describe('App', () => {
  it('renders email input component', () => {
    render(<App />);
    expect(screen.getByLabelText(/email local part/i)).toBeInTheDocument();
  });

  it('renders navigation tabs and switches content', () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: 'Home' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Search' }));
    expect(screen.getByText('Search Content')).toBeInTheDocument();
  });
});
