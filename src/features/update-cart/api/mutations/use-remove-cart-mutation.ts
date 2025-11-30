import { useMutation } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { removeCartItemFromLocalStorage } from '@/entities/cart/lib';
import { removeCartItemAction } from '../actions';

export function useRemoveCartMutation() {
  return useMutation({
    mutationFn: async (deletedCartItem: { productId: number }, { meta }) => {
      if (meta?.user != null) {
        const removeCartItemResult = await removeCartItemAction(deletedCartItem);
        if (removeCartItemResult.type === 'error') throw new Error(removeCartItemResult.error.message);
      } else {
        removeCartItemFromLocalStorage(deletedCartItem);
      }
    },
    onSettled(_data, _error, _variables, _onMutateResult, { client }) {
      client.invalidateQueries({ queryKey: cartQueryOptions().queryKey });
    },
  });
}
