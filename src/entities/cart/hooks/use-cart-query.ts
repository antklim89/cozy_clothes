import { queryOptions, useQuery } from '@tanstack/react-query';

import { userQueryOptions } from '../@x/user/hooks';
import { getCartAction, getCartByProductIdsAction } from '../api/actions';
import { getCartFromLocalStorage } from '../lib/cart-storage';
import { syncLocalAndServerCart } from '../lib/utils';
import type { CartItemType } from '../model';

export function cartQueryOptions() {
  return queryOptions({
    queryKey: ['cart'],
    async queryFn({ client }) {
      // TODO: refactor local and server cart syncing, clear local storage after syncing
      const localCart = getCartFromLocalStorage();

      const isAuthenticated = client.getQueryData(userQueryOptions.queryKey) != null;

      let serverCart: CartItemType[] = [];

      if (isAuthenticated) {
        const serverCartResult = await getCartAction();
        if (serverCartResult.type === 'error') throw new Error(serverCartResult.error.message);
        serverCart = serverCartResult.result;
      } else {
        const serverCartResult = await getCartByProductIdsAction({ productIds: localCart.map(i => i.productId) });
        if (serverCartResult.type === 'error') throw new Error(serverCartResult.error.message);
        serverCartResult.result.forEach(cartItem => {
          const localCartQty = localCart.find(i => i.productId === cartItem.productId)?.qty;
          if (localCartQty != null) cartItem.qty = localCartQty;
        });
        serverCart = serverCartResult.result;
      }

      const newCart = await syncLocalAndServerCart(localCart, serverCart);

      return [...serverCart, ...newCart.server];
    },
  });
}

export function useCartQuery() {
  const { data, isFetchedAfterMount, isPending } = useQuery(cartQueryOptions());

  return {
    data: isFetchedAfterMount && data != null ? data : ([] as CartItemType[]),
    isFetched: isFetchedAfterMount,
    isPending,
  };
}
