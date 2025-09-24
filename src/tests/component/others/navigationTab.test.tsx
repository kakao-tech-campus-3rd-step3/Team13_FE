import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import NavigationTab from '@/components/navigationTab';
import { colors } from '@/theme/color';

describe('NavigationTab 컴포넌트', () => {
  const tabs = [
    { label: '홈', content: <div>홈 콘텐츠</div> },
    { label: '검색', content: <div>검색 콘텐츠</div> },
    { label: '프로필', content: <div>프로필 콘텐츠</div> },
  ];

  it('첫 번째 탭 콘텐츠를 기본으로 렌더링한다', () => {
    render(<NavigationTab tabs={tabs} />);
    expect(screen.getByText('홈 콘텐츠')).toBeInTheDocument();
  });

  it('다른 탭을 클릭하면 콘텐츠가 변경된다', () => {
    render(<NavigationTab tabs={tabs} />);
    fireEvent.click(screen.getByRole('tab', { name: '검색' }));
    expect(screen.getByText('검색 콘텐츠')).toBeInTheDocument();
  });

  it('선택된 탭만 강조 표시한다', () => {
    render(<NavigationTab tabs={tabs} />);
    const searchTab = screen.getByRole('tab', { name: '검색' });
    fireEvent.click(searchTab);
    expect(searchTab).toHaveStyle(`color: ${colors.text.default}`);
    const homeTab = screen.getByRole('tab', { name: '홈' });
    expect(homeTab).toHaveStyle(`color: ${colors.text.sub}`);
  });
});
