'use client';
import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { UserType } from '@/entities/user/model';

export function QueryProvider({ children, user }: { children: ReactNode; user: UserType | null }) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: { meta: { user } },
        mutations: { meta: { user } },
      },
    }),
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

interface Meta extends Record<string, unknown> {
  user: UserType | null;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: Meta;
    mutationMeta: Meta;
  }
}
