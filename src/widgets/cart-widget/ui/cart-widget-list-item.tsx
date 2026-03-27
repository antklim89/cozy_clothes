'use client';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { CartItemType } from '@/entities/cart/model';
import { useRemoveCartMutation } from '@/features/update-cart/api';
import { CartQtyInput } from '@/features/update-cart/ui';
import { cn, getPrice } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { ColorCircle } from '@/shared/ui/color-circle';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/shared/ui/item';

export function CartWidgetListItem({ cartItem }: { cartItem: CartItemType }) {
  const { mutateAsync: removeFromCart } = useRemoveCartMutation();

  const { qty, product } = cartItem;

  async function handleRemoveFromCart() {
    await removeFromCart({ productId: product.id });
  }

  return (
    <Item variant="outline">
      <ItemMedia variant="image" className="h-48 w-24">
        <Image alt={product.title} height={200} src={product.imagePreview.url} width={100} />
      </ItemMedia>
      <ItemContent className="gap-2">
        <Link href={`/products/${product.id}`}>
          <ItemTitle className="text-xl">
            {product.baseTitle} ({product.title})
          </ItemTitle>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Badge>{product.category.name}</Badge>
          <Badge>{product.country.name}</Badge>
          <Badge>{product.size.name}</Badge>
          <Badge>
            <ColorCircle {...product.color} />
          </Badge>
        </div>
        <div>
          <div className={cn('flex items-center text-gray-600', { 'opacity-0': qty <= 1 })}>
            <span className="text-sm">x</span>
            <span className="w-20 border-none px-4 text-md">1</span>
            <span className="text-xl">{getPrice({ price: product.price, discount: product.discount })}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm">x</span>
            <span className="w-20 border-none px-4 text-lg">{qty}</span>
            <span className="text-2xl">{getPrice({ qty, price: product.price, discount: product.discount })}</span>
          </div>
        </div>
      </ItemContent>
      <ItemActions className="ml-auto self-end">
        <CartQtyInput productId={product.id} />
        <Button variant="destructive" size="icon-lg" onClick={handleRemoveFromCart}>
          <TrashIcon />
        </Button>
      </ItemActions>
    </Item>
  );
}
