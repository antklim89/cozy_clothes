'use client';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useRemoveCartMutation } from '@/features/update-cart/api';
import { CartQtyInput } from '@/features/update-cart/ui';
import { getPrice } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/shared/ui/item';
import type { CartItemType } from '../model';

export function CartListItem({ cartItem }: { cartItem: CartItemType }) {
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
          <Badge variant="outline" className="w-24 p-4 text-md uppercase">
            {product.category.name}
          </Badge>
          <Badge variant="outline" className="w-24 p-4 text-md uppercase">
            {product.country.name}
          </Badge>
          <Badge variant="outline" className="w-24 p-4 text-md uppercase">
            {product.size.name}
          </Badge>
          <Badge variant="outline" className="min-w-24 p-4 text-md uppercase">
            <span className="size-4 rounded-full" style={{ backgroundColor: product.color.code }} />
            {product.color.name}
          </Badge>
        </div>
        <div>
          {qty > 1 && (
            <div className="flex items-center text-gray-600">
              <span className="text-sm">x</span>
              <span className="w-20 border-none px-4 text-md">1</span>
              <span className="text-xl">{getPrice({ price: product.price, discount: product.discount })}</span>
            </div>
          )}

          <div className="flex items-center">
            <span className="text-sm">x</span>
            <span className="w-20 border-none px-4 text-lg">{qty}</span>
            <span className="text-2xl">{getPrice({ qty, price: product.price, discount: product.discount })}</span>
          </div>
        </div>
      </ItemContent>
      <ItemActions>
        <CartQtyInput productId={product.id} />
        <Button variant="outline" size="icon" className="px-8 text-destructive" onClick={handleRemoveFromCart}>
          <TrashIcon />
        </Button>
      </ItemActions>
    </Item>
  );
}
