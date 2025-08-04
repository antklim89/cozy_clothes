import { addCartItemToLocalStorage } from './cart-storage';
import { addCartItemAction } from '../api/actions';
import type { CartItemType, LocalCartItemType } from '../model';


export async function syncLocalAndServerCart(localCart: LocalCartItemType[], serverCart: CartItemType[]) {
  const cartDifference = localAndServerCartDifference(localCart, serverCart);
  const local: LocalCartItemType[] = [];
  const server: CartItemType[] = [];

  cartDifference.server.forEach((i) => {
    const newCart = addCartItemToLocalStorage({
      productId: i.productId,
      qty: i.qty,
    });

    local.push(...newCart);
  });

  await Promise.all(cartDifference.local.map(async (i) => {
    const addedCart = await addCartItemAction({
      productId: i.productId,
      qty: i.qty,
    });
    if (addedCart.type === 'ok') server.push(addedCart.result);
  }));

  return { local, server };
}

function localAndServerCartDifference(localCart: LocalCartItemType[], serverCart: CartItemType[]) {
  return {
    local: localCart.filter(i => !serverCart.some(j => j.productId === i.productId)),
    server: serverCart.filter(i => !localCart.some(j => j.productId === i.productId)),
  };
}
