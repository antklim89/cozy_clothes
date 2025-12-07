'use client';
import { useLayoutEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { UserType } from '@/entities/user/model';

export function UserProviderClient({ user }: { user: UserType | null }) {
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    queryClient.setQueryData(['user'], user);
  }, [queryClient.setQueryData, user]);

  return null;
}
