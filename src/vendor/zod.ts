export type ZodIssue = {
  path: (string | number)[];
  message: string;
};

export class ZodError extends Error {
  issues: ZodIssue[];

  constructor(issues: ZodIssue[]) {
    super(issues[0]?.message ?? 'Invalid input');
    this.issues = issues;
    this.name = 'ZodError';
  }
}

type ParseSuccess<T> = { success: true; data: T };
type ParseFailure = { success: false; issues: ZodIssue[] };
type ParseResult<T> = ParseSuccess<T> | ParseFailure;

type SafeParseSuccess<T> = { success: true; data: T };
type SafeParseFailure = { success: false; error: { issues: ZodIssue[] } };
export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseFailure;

type Check<T> = (value: T) => string | null;

const makeIssue = (path: (string | number)[], message: string): ZodIssue => ({
  path,
  message,
});

abstract class ZodType<T> {
  readonly _output!: T;

  abstract _parse(data: unknown, path: (string | number)[]): ParseResult<T>;

  parse(data: unknown): T {
    const result = this.safeParse(data);
    if (!result.success) {
      throw new ZodError(result.error.issues);
    }
    return result.data;
  }

  safeParse(data: unknown): SafeParseReturnType<T> {
    const parsed = this._parse(data, []);
    if (parsed.success) {
      return { success: true, data: parsed.data };
    }
    return { success: false, error: { issues: parsed.issues } };
  }

  optional(): ZodOptional<T> {
    return new ZodOptional(this);
  }

  or<U>(other: ZodType<U>): ZodUnion<[ZodType<T>, ZodType<U>]> {
    return new ZodUnion<[ZodType<T>, ZodType<U>]>([this, other]);
  }
}

class ZodString extends ZodType<string> {
  private readonly preprocessors: ((value: string) => string)[];
  private readonly checks: Check<string>[];

  constructor(
    preprocessors: ((value: string) => string)[] = [],
    checks: Check<string>[] = [],
  ) {
    super();
    this.preprocessors = preprocessors;
    this.checks = checks;
  }

  _parse(data: unknown, path: (string | number)[]): ParseResult<string> {
    let value: string;

    if (typeof data === 'string') {
      value = data;
    } else if (data === undefined || data === null) {
      value = '';
    } else {
      return {
        success: false,
        issues: [makeIssue(path, '유효한 문자열을 입력해 주세요.')],
      };
    }

    for (const fn of this.preprocessors) {
      value = fn(value);
    }

    for (const check of this.checks) {
      const message = check(value);
      if (message) {
        return { success: false, issues: [makeIssue(path, message)] };
      }
    }

    return { success: true, data: value };
  }

  transform(fn: (value: string) => string): ZodString {
    return new ZodString([...this.preprocessors, fn], [...this.checks]);
  }

  min(length: number, params?: { message?: string }): ZodString {
    return new ZodString(
      [...this.preprocessors],
      [
        ...this.checks,
        (value) =>
          value.length >= length
            ? null
            : (params?.message ?? `${length}자 이상 입력해 주세요.`),
      ],
    );
  }

  max(length: number, params?: { message?: string }): ZodString {
    return new ZodString(
      [...this.preprocessors],
      [
        ...this.checks,
        (value) =>
          value.length <= length
            ? null
            : (params?.message ?? `${length}자 이내로 입력해 주세요.`),
      ],
    );
  }

  email(params?: { message?: string }): ZodString {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return new ZodString(
      [...this.preprocessors],
      [
        ...this.checks,
        (value) =>
          emailRegex.test(value)
            ? null
            : (params?.message ?? '유효한 이메일을 입력해 주세요.'),
      ],
    );
  }

  regex(regex: RegExp, params?: { message?: string }): ZodString {
    return new ZodString(
      [...this.preprocessors],
      [
        ...this.checks,
        (value) =>
          regex.test(value)
            ? null
            : (params?.message ?? '형식이 올바르지 않습니다.'),
      ],
    );
  }

  url(params?: { message?: string }): ZodString {
    return new ZodString(
      [...this.preprocessors],
      [
        ...this.checks,
        (value) => {
          try {
            const parsed = new URL(value);
            return parsed.protocol.startsWith('http')
              ? null
              : (params?.message ?? '유효한 URL이 아닙니다.');
          } catch {
            return params?.message ?? '유효한 URL이 아닙니다.';
          }
        },
      ],
    );
  }
}

class ZodLiteral<T extends string | number | boolean> extends ZodType<T> {
  private readonly expected: T;

  constructor(expected: T) {
    super();
    this.expected = expected;
  }

  _parse(data: unknown, path: (string | number)[]): ParseResult<T> {
    if (data !== this.expected) {
      return {
        success: false,
        issues: [
          makeIssue(path, `값은 ${String(this.expected)}이어야 합니다.`),
        ],
      };
    }
    return { success: true, data: data as T };
  }
}

class ZodOptional<T> extends ZodType<T | undefined> {
  private readonly inner: ZodType<T>;

  constructor(inner: ZodType<T>) {
    super();
    this.inner = inner;
  }

  _parse(data: unknown, path: (string | number)[]): ParseResult<T | undefined> {
    if (data === undefined) {
      return { success: true, data: undefined };
    }
    return this.inner._parse(data, path);
  }
}

type UnionOptions = readonly ZodType<unknown>[];

class ZodUnion<TOptions extends UnionOptions> extends ZodType<
  TOptions[number]['_output']
> {
  private readonly options: TOptions;

  constructor(options: TOptions) {
    super();
    this.options = options;
  }

  _parse(
    data: unknown,
    path: (string | number)[],
  ): ParseResult<TOptions[number]['_output']> {
    const issues: ZodIssue[] = [];
    for (const option of this.options) {
      const result = option._parse(data, path);
      if (result.success) {
        return { success: true, data: result.data };
      }
      issues.push(...result.issues);
    }
    return {
      success: false,
      issues: issues.length
        ? issues
        : [makeIssue(path, '형식이 올바르지 않습니다.')],
    };
  }
}

type Shape = Record<string, ZodType<unknown>>;

type ObjectOutput<T extends Shape> = {
  [K in keyof T]: T[K]['_output'];
};

class ZodObject<T extends Shape> extends ZodType<ObjectOutput<T>> {
  private readonly shape: T;

  constructor(shape: T) {
    super();
    this.shape = shape;
  }

  _parse(
    data: unknown,
    path: (string | number)[],
  ): ParseResult<ObjectOutput<T>> {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return {
        success: false,
        issues: [makeIssue(path, '유효한 객체를 입력해 주세요.')],
      };
    }

    const result: Record<string, unknown> = {};
    const issues: ZodIssue[] = [];

    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key];
      const value = (data as Record<string, unknown>)[key];
      const parsed = schema._parse(value, [...path, key]);
      if (parsed.success) {
        result[key] = parsed.data;
      } else {
        issues.push(...parsed.issues);
      }
    }

    if (issues.length > 0) {
      return { success: false, issues };
    }

    return { success: true, data: result as ObjectOutput<T> };
  }
}

export const z = {
  string: () => new ZodString(),
  literal: <T extends string | number | boolean>(value: T) =>
    new ZodLiteral(value),
  object: <T extends Shape>(shape: T) => new ZodObject(shape),
};

export type infer<T extends ZodType<unknown>> = T['_output'];
