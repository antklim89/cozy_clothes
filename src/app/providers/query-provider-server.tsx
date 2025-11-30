import type { ReactNode } from 'react';

import { getMe } from '@/entities/user/services';
import { QueryProvider } from './query-provider';

export async function QueryProviderServer({ children }: { children: ReactNode }) {
  const user = await getMe();

  return <QueryProvider user={user}>{children}</QueryProvider>;
}
