import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartQueryOptions } from './use-cart-query';
import { useUserQuery } from '../@x/user/hooks';
import { addCartItemAction, getCartItemByVariantIdAction } from '../api/actions';
import { addCartItemToLocalStorage } from '../lib/cart-storage';


export function useAddCartMutation() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useUserQuery();

  return useMutation({
    mutationFn: async (newLocalCartItem: { variantId: number; qty: number }) => {
      const newCartItem = isAuthenticated
        ? await addCartItemAction(newLocalCartItem)
        : await getCartItemByVariantIdAction({ variantId: newLocalCartItem.variantId });

      if (newCartItem.type === 'error') throw new Error(newCartItem.error.message);

      addCartItemToLocalStorage(newLocalCartItem);
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue => oldValue ? [...oldValue, newCartItem.result] : oldValue);
    },
  });
}
