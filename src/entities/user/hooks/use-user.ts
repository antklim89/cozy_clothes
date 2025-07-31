import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { meQuery } from '../api/queries/me';


export const userQueryOptions = queryOptions({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  queryKey: ['user'],
  queryFn: async () => {
    const user = await meQuery();
    return user;
  },
});

export function useUserQuery() {
  const { data: user } = useSuspenseQuery(userQueryOptions);
  return { user, isAuthenticated: user != null };
}
