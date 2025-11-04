import { queryOptions } from '@tanstack/react-query';

import type { UserType } from '../../model';
import { meFetch } from '../fetch/me';

export const meQueryOptions = queryOptions<UserType | null>({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  queryKey: ['user'],
  queryFn: async () => {
    if (typeof window === 'undefined') return null;
    const user = await meFetch();
    if (!user) return null;
    return {
      email: user.email,
      id: user.id,
    };
  },
});
