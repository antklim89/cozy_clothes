import { useQuery } from '@tanstack/react-query';
import { auth } from '../actions';


export function useUser() {
  return useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    queryKey: ['user'],
    queryFn: async () => {
      const user = await auth();
      return user;
    },
  });
}
