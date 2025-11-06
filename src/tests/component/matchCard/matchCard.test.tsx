import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  BasicMatchCard,
  RecruitingMatchCard,
  SetMatchCard,
  FinishedMatchCard,
} from '@/components/matchCard';
import { theme } from '@/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('MatchCard Preset 컴포넌트들', () => {
  const defaultProps = {
    title: '부산대 넥서스 E동',
    time: '8/16 18:00 ~ 22:00',
    image: '/test-image.jpg',
  };

  describe('BasicMatchCard', () => {
    it('title과 time props가 올바르게 렌더링된다', () => {
      const testTitle = '테스트 장소명';
      const testTime = '12/25 10:00 ~ 15:00';

      renderWithTheme(<BasicMatchCard title={testTitle} time={testTime} />);

      expect(screen.getByText(testTitle)).toBeInTheDocument();
      expect(screen.getByText(testTime)).toBeInTheDocument();
    });

    it('이미지가 제공되면 올바르게 표시된다', () => {
      const testTitle = '테스트 장소';
      const testImage = '/test-image.jpg';

      renderWithTheme(
        <BasicMatchCard
          title={testTitle}
          time={defaultProps.time}
          image={testImage}
        />,
      );

      const image = screen.getByAltText(testTitle);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', testImage);
    });

    it('이미지가 없을 때 플레이스홀더가 표시된다', () => {
      renderWithTheme(
        <BasicMatchCard title={defaultProps.title} time={defaultProps.time} />,
      );

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
    });
  });

  describe('RecruitingMatchCard', () => {
    it('인원 정보가 올바르게 렌더링된다', () => {
      const testPeopleCount = '7/12';
      const testDeadline = '12/31 23:59';

      renderWithTheme(
        <RecruitingMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          peopleCount={testPeopleCount}
          deadline={testDeadline}
        />,
      );

      expect(screen.getByText(`모집 ${testPeopleCount}`)).toBeInTheDocument();
      expect(screen.getByText(`마감 ${testDeadline}`)).toBeInTheDocument();
    });

    it('deadline이 없어도 peopleCount는 표시된다', () => {
      const testPeopleCount = '5/8';

      renderWithTheme(
        <RecruitingMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          peopleCount={testPeopleCount}
        />,
      );

      expect(screen.getByText(`모집 ${testPeopleCount}`)).toBeInTheDocument();
      expect(screen.queryByText(/마감/)).not.toBeInTheDocument();
    });

    it('기본 정보도 함께 표시된다', () => {
      renderWithTheme(
        <RecruitingMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          peopleCount="8/10"
        />,
      );

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
    });
  });

  describe('SetMatchCard', () => {
    it('취소 버튼이 렌더링된다', () => {
      const mockOnCancel = () => {};

      renderWithTheme(
        <SetMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          onCancelClick={mockOnCancel}
        />,
      );

      expect(screen.getByText('취소하기')).toBeInTheDocument();
    });

    it('기본 정보와 취소 버튼이 모두 표시된다', () => {
      const mockOnCancel = () => {};

      renderWithTheme(
        <SetMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          image={defaultProps.image}
          onCancelClick={mockOnCancel}
        />,
      );

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
      expect(screen.getByText('취소하기')).toBeInTheDocument();
      expect(screen.getByAltText(defaultProps.title)).toHaveAttribute(
        'src',
        defaultProps.image,
      );
    });
  });

  describe('FinishedMatchCard', () => {
    it('결과 보기 버튼이 렌더링된다', () => {
      const mockOnResult = () => {};

      renderWithTheme(
        <FinishedMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          onResultClick={mockOnResult}
        />,
      );

      expect(screen.getByText('결과 보기')).toBeInTheDocument();
    });

    it('기본 정보와 결과 버튼이 모두 표시된다', () => {
      const mockOnResult = () => {};

      renderWithTheme(
        <FinishedMatchCard
          title={defaultProps.title}
          time={defaultProps.time}
          image={defaultProps.image}
          onResultClick={mockOnResult}
        />,
      );

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
      expect(screen.getByText('결과 보기')).toBeInTheDocument();
      expect(screen.getByAltText(defaultProps.title)).toHaveAttribute(
        'src',
        defaultProps.image,
      );
    });
  });

  describe('공통 기능', () => {
    it('모든 컴포넌트가 기본 구조를 가진다', () => {
      const mockFn = () => {};

      const { rerender } = renderWithTheme(
        <BasicMatchCard title={defaultProps.title} time={defaultProps.time} />,
      );
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <RecruitingMatchCard
            title={defaultProps.title}
            time={defaultProps.time}
            peopleCount="8/10"
          />
        </ThemeProvider>,
      );
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <SetMatchCard
            title={defaultProps.title}
            time={defaultProps.time}
            onCancelClick={mockFn}
          />
        </ThemeProvider>,
      );
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <FinishedMatchCard
            title={defaultProps.title}
            time={defaultProps.time}
            onResultClick={mockFn}
          />
        </ThemeProvider>,
      );
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.time)).toBeInTheDocument();
    });
  });
});
