import { useMutation } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { updateCartQtyInLocalStorage } from '@/entities/cart/lib';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { updateCartQtyAction } from '../actions';

export function useUpdateCartMutation() {
  const [updateCartQtyActionDebounced] = useDebounce(updateCartQtyAction);

  return useMutation({
    mutationFn: async (updatedCartItem: { productId: number; qty: number }, { meta }) => {
      if (await meta?.isAuthenticated()) {
        const updateCartQtyResult = await updateCartQtyActionDebounced(updatedCartItem);
        if (updateCartQtyResult.type === 'error') throw new Error(updateCartQtyResult.error.message);
      } else {
        updateCartQtyInLocalStorage(updatedCartItem);
      }
    },
    onMutate(variables, { client }) {
      client.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.map(i => (i.productId === variables.productId ? { ...i, qty: variables.qty } : i)),
      );
    },
    onSuccess(_data, variables, _onMutateResult, { client }) {
      client.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.map(i => (i.productId === variables.productId ? { ...i, qty: variables.qty } : i)),
      );
    },
  });
}
