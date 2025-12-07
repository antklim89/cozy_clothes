import { queryOptions } from '@tanstack/react-query';

import { getCartFromLocalStorage } from '../../lib';
import { clearCartLocalStorage } from '../../lib/cart-storage';
import { getCartAction, getCartByProductIdsAction } from '../actions';

export function cartQueryOptions() {
  return queryOptions({
    queryKey: ['cart'],
    enabled: typeof window !== 'undefined',
    async queryFn({ meta }) {
      const isAuthenticated = await meta?.isAuthenticated();
      const localCart = getCartFromLocalStorage();

      if (isAuthenticated) {
        const cartResult = await getCartAction({ localCart });
        if (localCart) clearCartLocalStorage();
        return cartResult.result;
      }

      const cartResult = await getCartByProductIdsAction({ localCart });
      return cartResult.result;
    },
  });
}
