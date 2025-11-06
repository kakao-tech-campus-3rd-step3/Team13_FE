import type { ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

type FormElement = HTMLInputElement | HTMLTextAreaElement;

export type FieldValues = Record<string, string | undefined>;

export type FieldError = {
  message?: string;
};

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> = {
  [K in keyof TFieldValues]?: FieldError;
};

export type UseFormRegisterReturn = {
  name: string;
  onBlur: (event: FocusEvent<FormElement>) => void;
  onChange: (event: ChangeEvent<FormElement>) => void;
  ref: (element: FormElement | null) => void;
};

type SubmitCallback<TFieldValues extends FieldValues> = (
  values: TFieldValues,
) => void | Promise<void>;

type ResolverResult<TFieldValues extends FieldValues> = {
  values: TFieldValues;
  errors: FieldErrors<TFieldValues>;
};

type Resolver<TFieldValues extends FieldValues> = (
  values: TFieldValues,
) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;

export interface UseFormOptions<
  TFieldValues extends FieldValues = FieldValues,
> {
  resolver?: Resolver<TFieldValues>;
  mode?: 'onSubmit' | 'onBlur';
  defaultValues?: Partial<TFieldValues>;
}

export interface FormState<TFieldValues extends FieldValues = FieldValues> {
  errors: FieldErrors<TFieldValues>;
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface UseFormReturn<TFieldValues extends FieldValues = FieldValues> {
  register: (name: keyof TFieldValues & string) => UseFormRegisterReturn;
  handleSubmit: (
    onValid: SubmitCallback<TFieldValues>,
  ) => (event?: FormEvent) => void;
  formState: FormState<TFieldValues>;
  setValue: (
    name: keyof TFieldValues & string,
    value: string | undefined,
  ) => void;
  getValues: () => TFieldValues;
  clearErrors: () => void;
  reset: (values?: Partial<TFieldValues>) => void;
  watch(): TFieldValues;
  watch(callback: (values: TFieldValues) => void): { unsubscribe: () => void };
}

const isFormElement = (value: unknown): value is FormElement =>
  typeof window !== 'undefined' && value instanceof HTMLElement;

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  options: UseFormOptions<TFieldValues> = {},
): UseFormReturn<TFieldValues> {
  const { resolver, mode = 'onSubmit', defaultValues } = options;

  const valuesRef = useRef<Partial<TFieldValues>>({
    ...defaultValues,
  });
  const defaultValuesRef = useRef<Partial<TFieldValues>>({
    ...defaultValues,
  });
  const fieldRefs = useRef<Record<string, FormElement | null>>({});
  const subscribers = useRef(new Set<(values: TFieldValues) => void>());

  const [errors, setErrors] = useState<FieldErrors<TFieldValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const notifySubscribers = useCallback(() => {
    const snapshot = {
      ...(valuesRef.current as TFieldValues),
    };
    subscribers.current.forEach((subscriber) => subscriber(snapshot));
  }, []);

  const computeIsDirty = useCallback(() => {
    const keys = new Set([
      ...Object.keys(defaultValuesRef.current),
      ...Object.keys(valuesRef.current),
    ]);

    for (const key of keys) {
      const current = valuesRef.current[key as keyof TFieldValues];
      const initial = defaultValuesRef.current[key as keyof TFieldValues];
      const normalizedCurrent = current ?? '';
      const normalizedInitial = initial ?? '';
      if (normalizedCurrent !== normalizedInitial) {
        return true;
      }
    }

    return false;
  }, []);

  const assignValue = useCallback(
    (name: keyof TFieldValues & string, value: string) => {
      valuesRef.current[name] = value as TFieldValues[keyof TFieldValues];
      setIsDirty(computeIsDirty());
      notifySubscribers();
    },
    [computeIsDirty, notifySubscribers],
  );

  const runResolver = useCallback(() => {
    if (!resolver) {
      const cloned = { ...(valuesRef.current as TFieldValues) };
      setErrors({} as FieldErrors<TFieldValues>);
      return { values: cloned, errors: {} as FieldErrors<TFieldValues> };
    }

    const evaluation = resolver(valuesRef.current as TFieldValues);

    if (evaluation instanceof Promise) {
      return evaluation.then((result) => {
        setErrors(result.errors);
        return result;
      });
    }

    setErrors(evaluation.errors);
    return evaluation;
  }, [resolver]);

  const focusFirstError = useCallback(
    (currentErrors: FieldErrors<TFieldValues>) => {
      const first = Object.keys(currentErrors)[0];
      if (!first) return;
      const element = fieldRefs.current[first];
      if (element && typeof element.focus === 'function') {
        element.focus();
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    (onValid: SubmitCallback<TFieldValues>) => (event?: FormEvent) => {
      event?.preventDefault();

      setIsSubmitting(true);
      const outcome = runResolver();

      const finalize = async (resolved: ResolverResult<TFieldValues>) => {
        if (Object.keys(resolved.errors).length > 0) {
          focusFirstError(resolved.errors);
          return;
        }

        await onValid(resolved.values);
      };

      if (outcome instanceof Promise) {
        void outcome.then(async (resolved) => {
          setIsSubmitting(false);
          await finalize(resolved);
        });
        return;
      }

      setIsSubmitting(false);
      void finalize(outcome);
    },
    [focusFirstError, runResolver],
  );

  const register = useCallback(
    (name: keyof TFieldValues & string): UseFormRegisterReturn => {
      return {
        name,
        onBlur: (event) => {
          assignValue(name, event.target.value);
          if (mode === 'onBlur') {
            void runResolver();
          }
        },
        onChange: (event) => {
          assignValue(name, event.target.value);
        },
        ref: (element) => {
          fieldRefs.current[name] = element ?? null;
          const storedValue = valuesRef.current[name];
          if (element && storedValue !== undefined && isFormElement(element)) {
            element.value = storedValue ?? '';
          }
        },
      };
    },
    [assignValue, mode, runResolver],
  );

  const setValue = useCallback(
    (name: keyof TFieldValues & string, value: string | undefined) => {
      const next = value ?? '';
      assignValue(name, next);
      const element = fieldRefs.current[name];
      if (element && isFormElement(element)) {
        element.value = next;
      }
    },
    [assignValue],
  );

  const getValues = useCallback(
    () => ({ ...(valuesRef.current as TFieldValues) }),
    [],
  );

  const clearErrors = useCallback(
    () => setErrors({} as FieldErrors<TFieldValues>),
    [],
  );

  const formState = useMemo(
    () => ({
      errors,
      isSubmitting,
      isDirty,
    }),
    [errors, isSubmitting, isDirty],
  );

  const reset = useCallback(
    (next?: Partial<TFieldValues>) => {
      const payload = next ?? defaultValuesRef.current;
      defaultValuesRef.current = { ...payload };
      valuesRef.current = { ...payload };

      Object.entries(fieldRefs.current).forEach(([fieldName, element]) => {
        if (element && isFormElement(element)) {
          const value =
            (valuesRef.current[fieldName as keyof TFieldValues] as string) ??
            '';
          element.value = value;
        }
      });

      setErrors({} as FieldErrors<TFieldValues>);
      setIsDirty(false);
      notifySubscribers();
    },
    [notifySubscribers],
  );

  const watch = useCallback((callback?: (values: TFieldValues) => void) => {
    if (!callback) {
      return valuesRef.current as TFieldValues;
    }

    const subscriber = (values: TFieldValues) => {
      callback({ ...values });
    };

    subscribers.current.add(subscriber);

    return {
      unsubscribe: () => {
        subscribers.current.delete(subscriber);
      },
    };
  }, []);

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    clearErrors,
    reset,
    watch,
  };
}

export type FieldErrorsImpl<T extends FieldValues> = FieldErrors<T>;
export type Resolver<TFieldValues extends FieldValues> = (
  values: TFieldValues,
) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;
export type SubmitHandler<TFieldValues extends FieldValues> = (
  values: TFieldValues,
) => void | Promise<void>;
