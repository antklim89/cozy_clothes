import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { updateCartQtyInLocalStorage } from '@/entities/cart/lib';
import { meQueryOptions } from '@/entities/user/api';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { updateCartQtyAction } from '../actions';

export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(meQueryOptions);
  const [updateCartQtyActionDebounced] = useDebounce(updateCartQtyAction);

  return useMutation({
    mutationFn: async (updatedCartItem: { productId: number; qty: number }) => {
      if (user) {
        const updateCartQtyResult = await updateCartQtyActionDebounced(updatedCartItem);
        if (updateCartQtyResult.type === 'error') throw new Error(updateCartQtyResult.error.message);
      } else {
        updateCartQtyInLocalStorage(updatedCartItem);
      }
    },
    onMutate(variables) {
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.map(i => (i.productId === variables.productId ? { ...i, qty: variables.qty } : i)),
      );
    },
    onSuccess(_data, variables) {
      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.map(i => (i.productId === variables.productId ? { ...i, qty: variables.qty } : i)),
      );
    },
  });
}
