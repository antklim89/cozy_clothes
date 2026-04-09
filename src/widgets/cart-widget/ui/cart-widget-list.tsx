import type { CartItemType } from '@/entities/cart/model';
import { CartList } from '@/entities/cart/ui';
import { CartWidgetListItem } from './cart-widget-list-item';

export function CartWidgetList({ cartItems }: { cartItems: CartItemType[] }) {
  return (
    <CartList>
      {cartItems.map(cartItem => (
        <CartWidgetListItem key={cartItem.product.id} cartItem={cartItem} />
      ))}
    </CartList>
  );
}
