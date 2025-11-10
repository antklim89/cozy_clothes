import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { removeCartItemFromLocalStorage } from '@/entities/cart/lib';
import { meQueryOptions } from '@/entities/user/api';
import { removeCartItemAction } from '../actions';

export function useRemoveCartMutation() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(meQueryOptions);

  return useMutation({
    mutationFn: async (deletedCartItem: { productId: number }) => {
      if (user != null) {
        const removeCartItemResult = await removeCartItemAction(deletedCartItem);
        if (removeCartItemResult.type === 'error') throw new Error(removeCartItemResult.error.message);
      } else {
        removeCartItemFromLocalStorage(deletedCartItem);
      }
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: cartQueryOptions().queryKey });
    },
  });
}
