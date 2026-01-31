import Link from 'next/link';

import { buttonVariants } from '@/shared/ui/button';
import { Item, ItemContent } from '@/shared/ui/item';

export function CartCheckout() {
  return (
    <Item variant="outline">
      <ItemContent>
        <Link className={buttonVariants({ size: 'lg' })} href="#">
          Checkout
        </Link>
      </ItemContent>
    </Item>
  );
}
