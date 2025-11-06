import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import OriginTitleBar from '@/components/titleBar/originTitleBar';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

describe('OriginTitleBar 컴포넌트', () => {
  it('제목과 뒤로 가기 버튼을 렌더링한다', () => {
    const handleBack = vi.fn();
    render(<OriginTitleBar title="기본" onBack={handleBack} />);

    const backButton = screen.getByLabelText('뒤로 가기');
    expect(backButton).toBeInTheDocument();
    expect(screen.getByText('기본')).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(handleBack).toHaveBeenCalled();
  });

  it('스타일을 적용하고 오른쪽 슬롯이 비어 있다', () => {
    render(<OriginTitleBar title="기본" onBack={() => {}} />);

    const backButton = screen.getByLabelText('뒤로 가기');
    expect(backButton).toHaveStyle(`width: ${spacing.spacing10}`);
    const icon = backButton.firstChild as HTMLElement;
    expect(icon).toHaveStyle('color: rgb(59, 130, 246)');
    expect(icon).toHaveStyle(
      'background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    );

    const title = screen.getByText('기본');
    expect(title).toHaveStyle(
      `font-weight: ${typography.title1Bold.fontWeight}`,
    );

    const header = screen.getByRole('banner');
    expect(header.lastChild).toBeEmptyDOMElement();
  });
});
