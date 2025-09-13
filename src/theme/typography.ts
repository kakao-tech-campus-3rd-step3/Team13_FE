export const typography = {
  title1Bold: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.6875rem',
  },
  title1Regular: {
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: '1.6875rem',
  },
  title2Bold: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
  },
  title2Regular: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
  },
  subtitle1Bold: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.375rem',
  },
  subtitle1Regular: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
  },
  subtitle2Bold: {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.1875rem',
  },
  subtitle2Regular: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.1875rem',
  },
  body1Bold: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.375rem',
  },
  body1Regular: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.375rem',
  },
  body2Bold: {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.1875rem',
  },
  body2Regular: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.1875rem',
  },
  label1Bold: {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: '1.1875rem',
  },
  label1Regular: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.1875rem',
  },
  label2Bold: {
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: '1rem',
  },
  label2Regular: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1rem',
  },
} as const;

export type Typography = typeof typography;
