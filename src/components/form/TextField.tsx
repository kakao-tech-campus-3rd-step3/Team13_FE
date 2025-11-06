import type { InputHTMLAttributes } from 'react';
import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

import { getAriaFor, makeIds } from '@/libs/a11y/formA11y';

import * as S from './TextField.styled';

type TextFieldProps = {
  name: string;
  label: string;
  hint?: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  as?: 'input' | 'textarea';
};

export default function TextField({
  name,
  label,
  hint,
  register,
  errors,
  type = 'text',
  as = 'input',
}: TextFieldProps) {
  const { inputId, errorId, hintId } = makeIds(name);
  const ariaProps = getAriaFor(name, errors, hint ? hintId : undefined);
  const errorMessage = errors[name]?.message ?? '';
  const invalid = Boolean(errorMessage);
  const { name: fieldName, onBlur, onChange, ref } = register;
  const ariaInvalid = ariaProps['aria-invalid'];
  const ariaDescribedBy = ariaProps['aria-describedby'];

  return (
    <S.Field invalid={invalid}>
      <S.Label htmlFor={inputId}>{label}</S.Label>
      {as === 'textarea' ? (
        <S.TextArea
          id={inputId}
          name={fieldName}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
        />
      ) : (
        <S.Input
          id={inputId}
          name={fieldName}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
        />
      )}
      {hint && <S.Hint id={hintId}>{hint}</S.Hint>}
      {invalid && (
        <S.ErrorText id={errorId} role="alert">
          {errorMessage}
        </S.ErrorText>
      )}
    </S.Field>
  );
}
