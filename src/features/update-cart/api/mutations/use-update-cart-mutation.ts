import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { updateCartQtyInLocalStorage } from '@/entities/cart/lib';
import { meQueryOptions } from '@/entities/user/api';
import { updateCartQtyAction } from '../actions';

export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(meQueryOptions);

  return useMutation({
    mutationFn: async (updatedCartItem: { productId: number; qty: number }) => {
      if (user) {
        const updateCartQtyResult = await updateCartQtyAction(updatedCartItem);
        if (updateCartQtyResult.type === 'error') throw new Error(updateCartQtyResult.error.message);
      } else {
        updateCartQtyInLocalStorage(updatedCartItem);
      }
    },
    onSuccess(_data, args) {
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.map(i => (i.productId === args.productId ? { ...i, qty: args.qty } : i)),
      );
    },
  });
}
