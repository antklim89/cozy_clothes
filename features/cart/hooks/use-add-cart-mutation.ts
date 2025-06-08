import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkIsAuthenticatedCookie } from '@/lib/auth';
import { cartQueryOptions } from './use-cart-query';
import { addCartItemAction, fetchCartItemByVariantIdAction } from '../actions';
import { addCartItemToLocalStorage } from '../cart-storage';


export function useAddCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLocalCartItem: { variantId: number; qty: number }) => {
      const isAuthenticated = checkIsAuthenticatedCookie();
      const newCartItem = isAuthenticated
        ? await addCartItemAction(newLocalCartItem)
        : await fetchCartItemByVariantIdAction({ variantId: newLocalCartItem.variantId });

      if (newCartItem.type === 'error') throw new Error(newCartItem.error.message);

      addCartItemToLocalStorage(newLocalCartItem);
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue => oldValue ? [...oldValue, newCartItem.result] : oldValue);
    },
  });
}
