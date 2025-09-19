export interface ButtonConfig {
  text: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
}

export interface MatchCardProps {
  // 기본 정보
  title: string;
  time: string;
  image?: string;

  // 사람 수 관련
  showPeopleCount?: boolean;
  peopleCount?: string; // "8/10" 형태
  deadline?: string; // "08/10 23:59" 형태

  // 버튼 관련
  buttons?: ButtonConfig[];
  resultButton?: boolean;
  onResultClick?: () => void;

  // 이벤트 핸들러
  onCardClick?: () => void;
}
