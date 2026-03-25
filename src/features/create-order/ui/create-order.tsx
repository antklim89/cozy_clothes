'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cartQueryOptions } from '@/entities/cart/api';
import { setCartToLocalStorage } from '@/entities/cart/lib';
import type { UserProfileType } from '@/entities/user/model';
import { CreateOrderForm } from './create-order-form';
import { createOrderAction } from '../api/actions';
import type { CreateOrderType } from '../models/types';

export function CreateOrder({ userProfile }: { userProfile: UserProfileType }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  async function handleSubmit(input: CreateOrderType) {
    const { error } = await createOrderAction({ input });
    if (error) return toast.error(error.message);

    toast.success('Order created successfully');
    queryClient.setQueryData(cartQueryOptions().queryKey, []);
    setCartToLocalStorage([]);
    router.replace('/user/profile');
  }

  return <CreateOrderForm userProfile={userProfile} onSubmit={handleSubmit} />;
}
