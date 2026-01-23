import { useMutation } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { removeCartItemFromLocalStorage } from '@/entities/cart/lib';
import { removeCartItemAction } from '../actions';

export function useRemoveCartMutation() {
  return useMutation({
    mutationFn: async (deletedCartItem: { productId: number }, { meta }) => {
      const isAuthenticated = await meta?.isAuthenticated();
      if (isAuthenticated) {
        const removeCartItemResult = await removeCartItemAction(deletedCartItem);
        if (removeCartItemResult.error) throw new Error(removeCartItemResult.error.message);
      }

      removeCartItemFromLocalStorage(deletedCartItem);
    },
    onSettled(_data, _error, _variables, _onMutateResult, { client }) {
      client.invalidateQueries({ queryKey: cartQueryOptions().queryKey });
    },
  });
}
