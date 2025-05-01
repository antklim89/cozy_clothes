
export interface Ok<T> {
  type: 'ok';
  result: T;
  error: null;
}

export interface Err<T extends string = string> {
  type: 'error';
  error: ErrVariant<T>;
  result: null;
}

interface ErrVariant<T extends string> {
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

export function ok<const T>(result: T): Ok<T> {
  return {
    type: 'ok',
    result,
    error: null,
  };
}

export function err<const T extends string>(error: ErrVariant<T>): Err<T> {
  return {
    type: 'error',
    error,
    result: null,
  };
}

export function errMap<OldErr extends string, NewErr extends string, R>(result: Result<R, OldErr>, errCb: (arg: ErrVariant<OldErr>) => ErrVariant<NewErr>): Result<R, NewErr> {
  if (result.type === 'ok') return result;
  return err(errCb(result.error));
}

export function okMap<R, U, E extends string>(result: Result<R, E>, okCb: (arg: R) => U): Result<U, E> {
  if (result.type === 'error') return result;
  return ok(okCb(result.result));
}
