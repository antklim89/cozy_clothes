import type { CartItemType } from '@/entities/cart/model';
import { ItemGroup } from '@/shared/ui/item';
import { CartWidgetListItem } from './cart-widget-list-item';

export function CartWidgetList({ cartItems }: { cartItems: CartItemType[] }) {
  return (
    <ItemGroup className="flex-3">
      {cartItems.map(cartItem => (
        <CartWidgetListItem key={cartItem.product.id} cartItem={cartItem} />
      ))}
    </ItemGroup>
  );
}
