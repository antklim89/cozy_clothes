import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { meQuery } from '../api/queries/me';
import type { UserType } from '../model';

export const userQueryOptions = queryOptions<UserType | null>({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  queryKey: ['user'],
  queryFn: async () => {
    if (typeof window === 'undefined') return null;
    const user = await meQuery();
    if (!user) return null;
    return {
      email: user.email,
      id: user.id,
    };
  },
});

export function useUserQuery() {
  const { data: user } = useSuspenseQuery(userQueryOptions);
  return { user, isAuthenticated: user != null };
}
