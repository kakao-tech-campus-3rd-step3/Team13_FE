import type { FieldErrors, FieldValues, Resolver } from '../react-hook-form';
import type { SafeParseReturnType, ZodIssue } from '../zod';

interface ZodSchema<TOutput> {
  safeParse: (data: unknown) => SafeParseReturnType<TOutput>;
}

const toFieldErrors = <TFieldValues extends FieldValues>(
  issues: ZodIssue[],
): FieldErrors<TFieldValues> => {
  return issues.reduce<FieldErrors<TFieldValues>>((acc, issue) => {
    const [field] = issue.path;
    if (typeof field === 'string' && !(field in acc)) {
      acc[field as keyof TFieldValues] = { message: issue.message };
    }
    return acc;
  }, {} as FieldErrors<TFieldValues>);
};

export const zodResolver = <
  TFieldValues extends FieldValues,
  TOutput = TFieldValues,
>(
  schema: ZodSchema<TOutput>,
): Resolver<TFieldValues> => {
  return (values: TFieldValues) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data as unknown as TFieldValues,
        errors: {} as FieldErrors<TFieldValues>,
      };
    }

    return {
      values,
      errors: toFieldErrors<TFieldValues>(result.error.issues),
    };
  };
};
