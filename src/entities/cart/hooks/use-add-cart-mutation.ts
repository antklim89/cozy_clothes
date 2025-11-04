import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from './use-cart-query';
import { meQueryOptions } from '../@x/user/api';
import { addCartItemAction, getCartItemByProductIdAction } from '../api/actions';
import { addCartItemToLocalStorage } from '../lib/cart-storage';

export function useAddCartMutation() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(meQueryOptions);

  return useMutation({
    mutationFn: async (newLocalCartItem: { productId: number; qty: number }) => {
      const newCartItem =
        user != null
          ? await addCartItemAction(newLocalCartItem)
          : await getCartItemByProductIdAction({ productId: newLocalCartItem.productId });

      if (newCartItem.type === 'error') throw new Error(newCartItem.error.message);

      addCartItemToLocalStorage(newLocalCartItem);
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue ? [...oldValue, newCartItem.result] : oldValue,
      );
    },
  });
}
