'use client';
import { type ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider, queryOptions } from '@tanstack/react-query';

import type { UserType } from '@/entities/user/model';

const userQueryOptions = queryOptions<UserType | null>({
  queryKey: ['user'],
});

const queryClient = new QueryClient();

export function QueryProviderClient({ children }: { children: ReactNode }) {
  useMemo(() => {
    function getUser() {
      return queryClient.ensureQueryData<UserType | null>({ queryKey: userQueryOptions.queryKey });
    }

    async function isAuthenticated() {
      const user = await queryClient.ensureQueryData<UserType | null>({ queryKey: userQueryOptions.queryKey });
      return user != null;
    }

    queryClient.setDefaultOptions({
      queries: {
        meta: { getUser, isAuthenticated },
      },
      mutations: {
        meta: { getUser, isAuthenticated },
      },
    });
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

interface MyMeta extends Record<string, unknown> {
  getUser: () => Promise<UserType | null>;
  isAuthenticated: () => Promise<boolean>;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta;
    mutationMeta: MyMeta;
  }
}
