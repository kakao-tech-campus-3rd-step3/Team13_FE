import { useState, type ChangeEvent } from 'react';

import * as S from './inputTextWithEmail.styled';
// TODO : 해당 파일에서 지속적으로 경로 대소문자 문제 발생

interface InputTextWithEmailProps {
  value?: string;
  defaultDomain?: string;
  helperText?: string;
  onChange?: (value: string) => void;
}

const DEFAULT_DOMAIN = 'pusan.ac.kr';

const InputTextWithEmail = ({
  value,
  defaultDomain = DEFAULT_DOMAIN,
  helperText,
  onChange,
}: InputTextWithEmailProps) => {
  const [localPart, setLocalPart] = useState(() => {
    const [local = ''] = value ? value.split('@') : [''];
    return local;
  });

  const initialDomain = value?.split('@')[1];
  const isCustomInitial = initialDomain && initialDomain !== defaultDomain;
  const [useCustomDomain, setUseCustomDomain] = useState(!!isCustomInitial);
  const [domain, setDomain] = useState(
    isCustomInitial ? (initialDomain ?? '') : defaultDomain,
  );

  const handleLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const local = e.target.value;
    setLocalPart(local);
    onChange?.(`${local}@${domain}`);
  };

  const handleDomainSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'other') {
      setUseCustomDomain(true);
      setDomain('');
      onChange?.(`${localPart}@`);
    } else {
      setUseCustomDomain(false);
      setDomain(defaultDomain);
      onChange?.(`${localPart}@${defaultDomain}`);
    }
  };

  const handleDomainInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    onChange?.(`${localPart}@${e.target.value}`);
  };

  return (
    <S.Wrapper>
      <S.InputArea>
        <S.LocalInput
          value={localPart}
          onChange={handleLocalChange}
          aria-label="email local part"
        />
        <S.AtSign>@</S.AtSign>
        {useCustomDomain ? (
          <S.DomainInput
            value={domain}
            onChange={handleDomainInputChange}
            aria-label="email domain input"
          />
        ) : (
          <S.DomainSelect
            value={defaultDomain}
            onChange={handleDomainSelectChange}
            aria-label="email domain select"
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
