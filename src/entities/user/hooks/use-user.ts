import { queryOptions, useQuery } from '@tanstack/react-query';
import { authenticateAction } from '../actions';


export const userQueryOptions = queryOptions({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  queryKey: ['user'],
  queryFn: async () => {
    const user = await authenticateAction();
    return user;
  },
});

export function useUser() {
  const { data, isPending } = useQuery(userQueryOptions);
  return { data, isPending };
}
