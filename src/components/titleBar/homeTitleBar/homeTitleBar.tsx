import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/button/iconButton';

import * as S from './homeTitleBar.styled';

interface HomeTitleBarProps {
  title: string;
  navigateTo: string;
}

const HomeTitleBar = ({ title, navigateTo }: HomeTitleBarProps) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    void navigate(navigateTo);
  };

  return (
    <S.Wrapper
      title={title}
      rightSlot={
        <IconButton ariaLabel="프로필" onClick={handleMenuClick}>
          <S.ProfileIcon aria-hidden />
        </IconButton>
      }
    />
  );
};

export default HomeTitleBar;
