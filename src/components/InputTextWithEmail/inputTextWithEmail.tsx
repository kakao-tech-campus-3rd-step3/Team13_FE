import { type ChangeEvent } from 'react';

import * as S from './inputTextWithEmail.styled';

export interface InputTextWithEmailProps {
  value: string;
  defaultDomain?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

const DEFAULT_DOMAIN = 'pusan.ac.kr';

const splitEmail = (email: string): [string, string] => {
  const [local = '', ...rest] = email.split('@');
  const domain = rest.length > 0 ? rest.join('@') : '';
  return [local, domain];
};

const InputTextWithEmail = ({
  value,
  defaultDomain = DEFAULT_DOMAIN,
  helperText,
  onChange,
}: InputTextWithEmailProps) => {
  const [localPart, domainPart] = splitEmail(value);
  const isCustomDomainSelected = domainPart !== defaultDomain;

  const handleLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const local = e.target.value;
    onChange(`${local}@${domainPart}`);
  };

  const handleDomainSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'other') {
      onChange(`${localPart}@`);
      return;
    }
    onChange(`${localPart}@${defaultDomain}`);
  };

  const handleDomainInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(`${localPart}@${e.target.value}`);
  };

  return (
    <S.Wrapper>
      <S.InputArea>
        <S.LocalInput
          value={localPart}
          onChange={handleLocalChange}
          aria-label="이메일 아이디 입력"
        />
        <S.AtSign>@</S.AtSign>
        {isCustomDomainSelected ? (
          <S.DomainInput
            value={domainPart}
            onChange={handleDomainInputChange}
            aria-label="이메일 도메인 입력"
          />
        ) : (
          <S.DomainSelect
            value={isCustomDomainSelected ? 'other' : defaultDomain}
            onChange={handleDomainSelectChange}
            aria-label="이메일 도메인 선택"
          >
            <option value={defaultDomain}>{defaultDomain}</option>
            <option value="other">직접입력</option>
          </S.DomainSelect>
        )}
      </S.InputArea>
      {helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.Wrapper>
  );
};

export default InputTextWithEmail;
