import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { useDebounce } from '@/shared/hooks/use-debounce';
import { cartQueryOptions } from './use-cart-query';
import { meQueryOptions } from '../@x/user/api';
import { updateCartQtyAction } from '../api/actions';
import { updateCartQtyInLocalStorage } from '../lib/cart-storage';

export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  const updateCartQtyActionDebounced = useDebounce(updateCartQtyAction);
  const { data: user } = useSuspenseQuery(meQueryOptions);

  return useMutation({
    mutationFn: async (updatedCartItem: { productId: number; qty: number }) => {
      if (user != null) {
        await updateCartQtyActionDebounced(updatedCartItem);
      }

      updateCartQtyInLocalStorage(updatedCartItem);

      queryClient.setQueryData(cartQueryOptions().queryKey, oldValue =>
        oldValue?.map(i => (i.productId === updatedCartItem.productId ? { ...i, qty: updatedCartItem.qty } : i)),
      );
    },
  });
}
