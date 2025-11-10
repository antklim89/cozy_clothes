import { queryOptions } from '@tanstack/react-query';

import { meQueryOptions } from '../../@x/user/api';
import { getCartFromLocalStorage } from '../../lib';
import { clearCartLocalStorage } from '../../lib/cart-storage';
import { getCartAction, getCartByProductIdsAction } from '../actions';

export function cartQueryOptions() {
  return queryOptions({
    queryKey: ['cart'],
    async queryFn({ client }) {
      const isAuthenticated = client.getQueryData(meQueryOptions.queryKey) != null;
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
