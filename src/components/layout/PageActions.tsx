import * as S from './PageActions.styled';

type Props = {
  onReset?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
};

export default function PageActions({ onReset, onNext, nextDisabled }: Props) {
  return (
    <S.Bar>
      <S.Secondary type="button" onClick={onReset} aria-label="reset">
        초기화
      </S.Secondary>
      <S.Primary
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="next"
      >
        다음
      </S.Primary>
    </S.Bar>
  );
}
