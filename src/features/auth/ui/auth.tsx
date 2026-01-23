'use client';

import type { AuthType } from '@/entities/user/model';
import { AuthForm } from './auth-form';
import { loginAction, registerAction } from '../api/actions';

interface Props {
  type: 'login' | 'register';
}

export function Auth({ type }: Props) {
  async function handleSubmit(data: AuthType) {
    const result = type === 'login' ? await loginAction(data) : await registerAction(data);
    if (result.error) return result;

    location.reload();
    return result;
  }

  return <AuthForm type={type} onSubmit={handleSubmit} />;
}
