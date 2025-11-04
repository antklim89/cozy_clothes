import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from './use-cart-query';
import { meQueryOptions } from '../@x/user/api';
import { removeCartItemAction } from '../api/actions';
import { removeCartItemFromLocalStorage } from '../lib/cart-storage';

export function useRemoveCartMutation() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(meQueryOptions);

  return useMutation({
    mutationFn: async (deletedCartItem: { productId: number }) => {
      if (user != null) {
        await removeCartItemAction(deletedCartItem);
      }

      removeCartItemFromLocalStorage(deletedCartItem);
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.filter(i => i.productId !== deletedCartItem.productId),
      );
    },
  });
}
