import type {
  FieldErrors,
  UseFormRegisterReturn,
} from '@form-kit/react-hook-form-lite';
import type { InputHTMLAttributes } from 'react';

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
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export default function TextField({
  name,
  label,
  hint,
  register,
  errors,
  type = 'text',
  as = 'input',
  placeholder,
  autoComplete,
  disabled = false,
  readOnly = false,
}: TextFieldProps) {
  const { inputId, errorId, hintId } = makeIds(name);
  const ariaProps = getAriaFor(name, errors, hint ? hintId : undefined);
  const rawError = errors[name]?.message;
  const errorMessage = typeof rawError === 'string' ? rawError : '';
  const invalid = Boolean(errorMessage);
  const { name: fieldName, onBlur, onChange, ref } = register;
  const ariaInvalid = ariaProps['aria-invalid'];
  const ariaDescribedBy = ariaProps['aria-describedby'];
  const ariaErrorMessage = ariaProps['aria-errormessage'];
  const resolvedAutoComplete =
    autoComplete ?? (type === 'email' ? 'email' : 'off');
  const resolvedInputMode = type === 'email' ? 'email' : undefined;

  return (
    <S.Field invalid={invalid} disabled={disabled}>
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
          aria-errormessage={invalid ? ariaErrorMessage : undefined}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          autoCorrect="off"
          autoCapitalize="none"
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
          aria-errormessage={invalid ? ariaErrorMessage : undefined}
          placeholder={placeholder}
          autoComplete={resolvedAutoComplete}
          inputMode={resolvedInputMode}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          autoCorrect="off"
          autoCapitalize="none"
        />
      )}
      {hint && <S.Hint id={hintId}>{hint}</S.Hint>}
      {invalid && (
        <S.ErrorText id={errorId} role="status" aria-live="polite">
          {errorMessage}
        </S.ErrorText>
      )}
    </S.Field>
  );
}
