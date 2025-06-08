import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkIsAuthenticatedCookie } from '@/lib/auth';
import { cartQueryOptions } from './use-cart-query';
import { removeCartItemAction } from '../actions';
import { removeCartItemFromLocalStorage } from '../cart-storage';


export function useRemoveCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deletedCartItem: { variantId: number }) => {
      const isAuthenticated = checkIsAuthenticatedCookie();
      if (isAuthenticated) {
        await removeCartItemAction(deletedCartItem);
      }

      removeCartItemFromLocalStorage(deletedCartItem);
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue => oldValue?.filter(i => i.variantId !== deletedCartItem.variantId));
    },
  });
}
