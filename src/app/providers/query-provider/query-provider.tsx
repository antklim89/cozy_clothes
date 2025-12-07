import { type ReactNode, Suspense } from 'react';

import { QueryProviderClient } from './query-provider-client';
import { UserProvider } from './user-provider';

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProviderClient>
      {children}
      <Suspense>
        <UserProvider />
      </Suspense>
    </QueryProviderClient>
  );
}
