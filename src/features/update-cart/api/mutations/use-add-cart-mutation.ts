import { useMutation } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { addCartItemToLocalStorage } from '@/entities/cart/lib';
import { addCartItemAction } from '../actions';

export function useAddCartMutation() {
  return useMutation({
    mutationFn: async (newLocalCartItem: { productId: number; qty: number }, { meta }) => {
      const isAuthenticated = await meta?.isAuthenticated();
      if (isAuthenticated) {
        const addCartItemResult = await addCartItemAction(newLocalCartItem);
        if (addCartItemResult.type === 'error') throw new Error(addCartItemResult.error.message);
      }

      addCartItemToLocalStorage(newLocalCartItem);
    },
    onSettled(_data, _error, _variables, _onMutateResult, { client }) {
      client.invalidateQueries({ queryKey: cartQueryOptions().queryKey });
    },
  });
}
