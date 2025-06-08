import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { checkIsAuthenticatedCookie } from '@/lib/auth';
import { cartQueryOptions } from './use-cart-query';
import { updateCartQtyAction } from '../actions';
import { updateCartQtyInLocalStorage } from '../cart-storage';


export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useMutation({
    mutationFn: async (updatedCartItem: { variantId: number; qty: number }) => {
      const isAuthenticated = checkIsAuthenticatedCookie();
      if (isAuthenticated) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
          await updateCartQtyAction(updatedCartItem);
        }, 700);
      }

      updateCartQtyInLocalStorage(updatedCartItem);

      queryClient.setQueryData(
        cartQueryOptions().queryKey,
        oldValue => oldValue?.map(i => i.variantId === updatedCartItem.variantId ? { ...i, qty: updatedCartItem.qty } : i),
      );
    },
  });
}
