import * as S from './PageActions.styled';

type Props = {
  onReset?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  resetLabel?: string;
};

export default function PageActions({
  onReset,
  onNext,
  nextDisabled = false,
  nextLabel = '다음',
  resetLabel = '초기화',
}: Props) {
  const nextDescription = nextDisabled
    ? '최소 1개 이상 선택해주세요'
    : '다음 단계로';

  return (
    <S.Container>
      <S.ResetButton type="button" onClick={onReset} aria-label="선택 초기화">
        {resetLabel}
      </S.ResetButton>
      <S.NextButton
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="next"
        aria-description={nextDescription}
      >
        {nextLabel}
      </S.NextButton>
    </S.Container>
  );
}
