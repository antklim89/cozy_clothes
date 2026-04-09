import type { ReactNode } from 'react';

import { ItemGroup } from '@/shared/ui/item';

export function CartList({ children }: { children: ReactNode[] }) {
  return <ItemGroup>{children}</ItemGroup>;
}
