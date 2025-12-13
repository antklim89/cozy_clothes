import { queryOptions } from '@tanstack/react-query';

import { getMeAction } from '../actions';

export function meQueryOptions() {
  return queryOptions({
    queryKey: ['user'],
    enabled: typeof window !== 'undefined',
    staleTime: Number.POSITIVE_INFINITY,
    queryFn() {
      return getMeAction();
    },
  });
}
