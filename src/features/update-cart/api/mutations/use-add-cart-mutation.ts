import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { addCartItemToLocalStorage } from '@/entities/cart/lib';
import { meQueryOptions } from '@/entities/user/api';
import { addCartItemAction } from '../actions';

export function useAddCartMutation() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(meQueryOptions);

  return useMutation({
    mutationFn: async (newLocalCartItem: { productId: number; qty: number }) => {
      if (user != null) {
        const addCartItemResult = await addCartItemAction(newLocalCartItem);
        if (addCartItemResult.type === 'error') throw new Error(addCartItemResult.error.message);
      } else {
        addCartItemToLocalStorage(newLocalCartItem);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: cartQueryOptions().queryKey });
    },
  });
}
