'use client';
import { TrashIcon } from 'lucide-react';

import type { CartItemType } from '@/entities/cart/model';
import { CartListItem } from '@/entities/cart/ui';
import { useRemoveCartMutation } from '@/features/update-cart/api';
import { CartQtyInput } from '@/features/update-cart/ui';
import { Button } from '@/shared/ui/button';

export function CartWidgetListItem({ cartItem }: { cartItem: CartItemType }) {
  const { mutateAsync: removeFromCart } = useRemoveCartMutation();

  async function handleRemoveFromCart() {
    await removeFromCart({ productId: cartItem.product.id });
  }

  return (
    <CartListItem
      cartItem={cartItem}
      actionsSlot={
        <>
          <CartQtyInput productId={cartItem.product.id} />
          <Button size="icon-lg" onClick={handleRemoveFromCart}>
            <TrashIcon />
          </Button>
        </>
      }
    />
  );
}
