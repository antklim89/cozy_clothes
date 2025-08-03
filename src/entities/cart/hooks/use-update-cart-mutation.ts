import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/src/shared/hooks/use-debounce';
import { cartQueryOptions } from './use-cart-query';
import { useUserQuery } from '../@x/user/hooks';
import { updateCartQtyAction } from '../api/actions';
import { updateCartQtyInLocalStorage } from '../lib/cart-storage';


export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  const updateCartQtyActionDebounced = useDebounce(updateCartQtyAction);
  const { isAuthenticated } = useUserQuery();

  return useMutation({
    mutationFn: async (updatedCartItem: { variantId: number; qty: number }) => {
      if (isAuthenticated) {
        await updateCartQtyActionDebounced(updatedCartItem);
      }

      updateCartQtyInLocalStorage(updatedCartItem);

      queryClient.setQueryData(
        cartQueryOptions().queryKey,
        oldValue => oldValue?.map(i => i.variantId === updatedCartItem.variantId ? { ...i, qty: updatedCartItem.qty } : i),
      );
    },
  });
}
