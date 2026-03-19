import Link from 'next/link';

import { Button, buttonVariants } from '@/shared/ui/button';
import { Item, ItemContent } from '@/shared/ui/item';

export function CartCheckout({ isAuth }: { isAuth: boolean }) {
  return (
    <Item variant="outline">
      <ItemContent>
        {isAuth ? (
          <Link className={buttonVariants({ size: 'lg' })} href="/checkout">
            Checkout
          </Link>
        ) : (
          <Button size="lg">Login to Checkout</Button>
        )}
      </ItemContent>
    </Item>
  );
}
