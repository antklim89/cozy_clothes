

export interface Success<T> {
  type: 'success';
  result: T;
  message: null;
  error: null;
}

export interface Err {
  type: 'error';
  error: {
    type: null;
    message: string;
  } | {
    type: 'unexpected';
    message: string;
  } | {
    type: 'not-found';
    message: string;
  } | {
    type: 'validation';
    errors: Record<string, unknown>;
  };
  result: null;
}

export type Result<T> = Success<T> | Err;

export type PromiseResult<T> = Promise<Result<T>>;


export const UNEXPECTED_ERROR = {
  type: 'unexpected',
  message: 'Unexpected error. Try again later.',
} as const satisfies Err['error'];

export const NOT_FOUND_ERROR = {
  type: 'not-found',
  message: 'Not found.',
} as const satisfies Err['error'];

export function success<T>(result: T): Success<T> {
  return {
    type: 'success',
    result,
    message: null,
    error: null,
  };
}

export function err(error: Err['error']): Err {
  return {
    type: 'error',
    error,
    result: null,
  };
}
