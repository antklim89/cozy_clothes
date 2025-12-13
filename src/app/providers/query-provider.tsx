'use client';
import { type ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { meQueryOptions } from '@/entities/user/api';
import type { UserType } from '@/entities/user/model';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  useMemo(() => {
    function getUser() {
      return queryClient.ensureQueryData(meQueryOptions());
    }

    async function isAuthenticated() {
      const user = await queryClient.ensureQueryData(meQueryOptions());
      return user != null;
    }

    queryClient.setDefaultOptions({
      queries: { meta: { getUser, isAuthenticated } },
      mutations: { meta: { getUser, isAuthenticated } },
    });
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

interface Meta extends Record<string, unknown> {
  getUser: () => Promise<UserType | null>;
  isAuthenticated: () => Promise<boolean>;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: Meta;
    mutationMeta: Meta;
  }
}
