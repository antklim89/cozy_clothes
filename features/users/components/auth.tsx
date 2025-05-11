'use client';
import { notFound } from 'next/navigation';
import { AuthForm } from './forms/auth-form';
import { AuthLayout } from './layouts/auth-layout';
import { createUser, login } from '../actions';
import { useUser } from '../hooks/use-user';
import type { LoginSchemaType, RegisterSchemaType } from '../schemas';


interface Props {
  type: 'login' | 'register';
}

export function Auth({ type }: Props) {
  const { data: user } = useUser();
  if (user != null) notFound();

  async function handleSubmit(data: LoginSchemaType | RegisterSchemaType) {
    const result = type === 'login'
      ? await login(data)
      : await createUser(data);

    if (result.type === 'error') return result;

    const prevPath = location.hash.replace('#', '');
    location.replace(prevPath.length > 0 ? prevPath : '/');
    return result;
  }

  return (
    <AuthLayout type={type}>
      <AuthForm type={type} onSubmit={handleSubmit} />
    </AuthLayout>
  );
}
