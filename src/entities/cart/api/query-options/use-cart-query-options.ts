import { queryOptions } from '@tanstack/react-query';

import { getCartFromLocalStorage } from '../../lib';
import { setCartToLocalStorage } from '../../lib/cart-storage';
import { getAndSyncCartAction, getLocalCartAction } from '../actions';

export function cartQueryOptions() {
  return queryOptions({
    queryKey: ['cart'],
    enabled: typeof window !== 'undefined',
    async queryFn({ meta }) {
      const isAuthenticated = await meta?.isAuthenticated();
      const localCart = getCartFromLocalStorage();

      if (isAuthenticated) {
        const cartResult = await getAndSyncCartAction({ localCart });
        if (cartResult.result) {
          setCartToLocalStorage(cartResult.result?.map(item => ({ productId: item.product.id, qty: item.qty })));
        }
        return cartResult.result;
      }

      const cartResult = await getLocalCartAction({ localCart });
      return cartResult.result;
    },
  });
}
