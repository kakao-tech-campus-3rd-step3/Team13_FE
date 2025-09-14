import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import NavigationTab from '@/components/navigationTab';
import { colors } from '@/theme/color';

describe('NavigationTab', () => {
  const tabs = [
    { label: 'Home', content: <div>Home Content</div> },
    { label: 'Search', content: <div>Search Content</div> },
    { label: 'Profile', content: <div>Profile Content</div> },
  ];

  it('renders first tab content by default', () => {
    render(<NavigationTab tabs={tabs} />);
    expect(screen.getByText('Home Content')).toBeInTheDocument();
  });

  it('changes content when a different tab is clicked', () => {
    render(<NavigationTab tabs={tabs} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Search' }));
    expect(screen.getByText('Search Content')).toBeInTheDocument();
  });

  it('highlights only the selected tab', () => {
    render(<NavigationTab tabs={tabs} />);
    const searchTab = screen.getByRole('tab', { name: 'Search' });
    fireEvent.click(searchTab);
    expect(searchTab).toHaveStyle(`color: ${colors.text.default}`);
    const homeTab = screen.getByRole('tab', { name: 'Home' });
    expect(homeTab).toHaveStyle(`color: ${colors.text.sub}`);
  });
});
