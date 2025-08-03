import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartQueryOptions } from './use-cart-query';
import { useUserQuery } from '../@x/user/hooks';
import { removeCartItemAction } from '../api/actions';
import { removeCartItemFromLocalStorage } from '../lib/cart-storage';


export function useRemoveCartMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useUserQuery();

  return useMutation({
    mutationFn: async (deletedCartItem: { variantId: number }) => {
      if (isAuthenticated) {
        await removeCartItemAction(deletedCartItem);
      }

      removeCartItemFromLocalStorage(deletedCartItem);
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue => oldValue?.filter(i => i.variantId !== deletedCartItem.variantId));
    },
  });
}
