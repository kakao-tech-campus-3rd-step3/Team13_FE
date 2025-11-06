import * as S from './loginTitleBar.styled';

const LoginTitleBar = () => {
  return <S.Wrapper title="로그인" rightSlot={<S.ProfileIcon />} />;
};

export default LoginTitleBar;
