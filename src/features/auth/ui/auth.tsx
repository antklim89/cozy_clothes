'use client';
import { useQueryClient } from '@tanstack/react-query';

import { userQueryOptions } from '@/entities/user/hooks';
import type { AuthType } from '@/entities/user/model';
import { AuthForm } from './auth-form';
import { loginAction, registerAction } from '../api/actions';

interface Props {
  type: 'login' | 'register';
}

export function Auth({ type }: Props) {
  const queryClient = useQueryClient();

  async function handleSubmit(data: AuthType) {
    const result = type === 'login' ? await loginAction(data) : await registerAction(data);

    if (result.type === 'error') return result;

    queryClient.setQueryData(userQueryOptions.queryKey, result.result);

    return result;
  }

  return <AuthForm type={type} onSubmit={handleSubmit} />;
}
