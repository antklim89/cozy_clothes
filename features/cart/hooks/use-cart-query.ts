import { queryOptions, useQuery } from '@tanstack/react-query';
import { checkIsAuthenticatedCookie } from '@/lib/auth';
import { fetchCartAction, fetchCartByVariantIdsAction } from '../actions';
import { getCartFromLocalStorage } from '../cart-storage';
import type { CartItemType } from '../types';
import { syncLocalAndServerCart } from '../utils';


export function cartQueryOptions() {
  return queryOptions({
    queryKey: ['cart'],
    async queryFn() {
      const localCart = getCartFromLocalStorage();

      const isAuthenticated = checkIsAuthenticatedCookie();

      let serverCart: CartItemType[] = [];

      if (isAuthenticated) {
        const serverCartResult = await fetchCartAction();
        if (serverCartResult.type === 'error') throw new Error(serverCartResult.error.message);
        serverCart = serverCartResult.result;
      } else {
        const serverCartResult = await fetchCartByVariantIdsAction({ variantIds: localCart.map(i => i.variantId) });
        if (serverCartResult.type === 'error') throw new Error(serverCartResult.error.message);
        serverCartResult.result.forEach((cartItem) => {
          const localCartQty = localCart.find(i => i.variantId === cartItem.variantId)?.qty;
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
    data: (isFetchedAfterMount && data != null) ? data : [] as CartItemType[],
    isFetched: isFetchedAfterMount,
    isPending,
  };
}
