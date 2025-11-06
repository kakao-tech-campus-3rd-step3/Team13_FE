import type { FieldErrors } from '@form-kit/react-hook-form-lite';
import { useEffect } from 'react';

export const makeIds = (name: string) => ({
  inputId: `${name}-input`,
  errorId: `${name}-error`,
  hintId: `${name}-hint`,
});

export function getAriaFor(name: string, errors: FieldErrors, hintId?: string) {
  const { errorId } = makeIds(name);
  const hasError = Boolean(errors[name]?.message);
  const describedBy = [hasError ? errorId : null, hintId ?? null]
    .filter(Boolean)
    .join(' ');

  return {
    'aria-invalid': hasError || undefined,
    'aria-describedby': describedBy || undefined,
    'aria-errormessage': hasError ? errorId : undefined,
  } as const;
}

export function useAutoFocusError(errors: FieldErrors, order?: string[]) {
  useEffect(() => {
    if (!errors || Object.keys(errors).length === 0) return;
    const candidates = order?.length ? order : Object.keys(errors);
    const first = candidates.find((name) => errors[name]);
    if (!first) return;

    if (typeof document === 'undefined') return;

    const byName = document.querySelector<HTMLElement>(`[name="${first}"]`);
    const fallback = document.getElementById(`${first}-input`);
    const element = byName ?? fallback;

    if (element instanceof HTMLElement) {
      element.focus();
    }
  }, [errors, order]);
}
