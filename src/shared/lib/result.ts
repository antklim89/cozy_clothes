export interface Ok<T> {
  result: T;
  error: null;
}

export interface Err<T extends string = string> {
  error: ErrVariant<T>;
  result: null;
}

interface ErrVariant<T extends string = string> {
  type: T;
  message: string;
  original?: unknown;
  errors?: Record<string, string>;
}

export type Result<T, E extends string = string> = Ok<T> | Err<E>;

export type PromiseResult<T, E extends string = string> = Promise<Result<T, E>>;

export const UNEXPECTED_ERROR = {
  type: 'unexpected',
  message: 'Unexpected error. Try again later.',
} as const satisfies ErrVariant<'unexpected'>;

export const NOT_FOUND_ERROR = {
  type: 'not-found',
  message: 'Not found.',
} as const satisfies ErrVariant<'not-found'>;

export function ok<T>(result: T): Ok<T> {
  return {
    result,
    error: null,
  };
}

export function err<T extends string>(error: ErrVariant<T>): Err<T> {
  return {
    error,
    result: null,
  };
}

export function okMap<R, U, E extends string>(result: Result<R, E>, okCb: (arg: R) => U): Result<U, E> {
  if (result.error) return result;
  return ok(okCb(result.result));
}

export const ErrType = {
  UNEXPECTED: 'unexpected',
  NOT_FOUND: 'not-found',
  UNAUTHENTICATED: 'unauthenticated',
  VALIDATION: 'validation',
  CONFLICT: 'conflict',
} as const;
export type ErrType = (typeof ErrType)[keyof typeof ErrType];

export function errUnexpected(message: string, rest?: Pick<ErrVariant, 'original' | 'errors'>): Err<'unexpected'> {
  return err({ type: ErrType.UNEXPECTED, message, ...rest });
}

export function errNotFound(message: string, rest?: Pick<ErrVariant, 'original' | 'errors'>): Err<'not-found'> {
  return err({ type: ErrType.NOT_FOUND, message, ...rest });
}

export function errUnauthenticated(
  message: string,
  rest?: Pick<ErrVariant, 'original' | 'errors'>,
): Err<'unauthenticated'> {
  return err({ type: ErrType.UNAUTHENTICATED, message, ...rest });
}

export function errValidation(message: string, rest?: Pick<ErrVariant, 'original' | 'errors'>): Err<'validation'> {
  return err({ type: ErrType.VALIDATION, message, ...rest });
}

export function errConflict(message: string, rest?: Pick<ErrVariant, 'original' | 'errors'>): Err<'conflict'> {
  return err({ type: ErrType.CONFLICT, message, ...rest });
}
