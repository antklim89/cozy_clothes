import type { CartItemType } from '@/entities/cart/model';
import { CartList, CartListItem } from '@/entities/cart/ui';
import { getPrice } from '@/shared/lib/utils';
import { Item, ItemContent } from '@/shared/ui/item';

export function ConfirmOrderCartList({ cart }: { cart: CartItemType[] }) {
  const totalPrice = cart.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.qty, 0);

  return (
    <CartList>
      {cart.map(cartItem => (
        <CartListItem cartItem={cartItem} key={cartItem.product.id} />
      ))}
      <Item>
        <ItemContent className="text-xl">
          Total Price: <span className="text-4xl">{getPrice({ price: totalPrice })}</span>
        </ItemContent>
      </Item>
    </CartList>
  );
}
