import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/use-debounce';
import { checkIsAuthenticatedCookie } from '@/lib/auth';
import { cartQueryOptions } from './use-cart-query';
import { updateCartQtyAction } from '../actions';
import { updateCartQtyInLocalStorage } from '../cart-storage';


export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  const updateCartQtyActionDebounced = useDebounce(updateCartQtyAction);

  return useMutation({
    mutationFn: async (updatedCartItem: { variantId: number; qty: number }) => {
      const isAuthenticated = checkIsAuthenticatedCookie();
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
