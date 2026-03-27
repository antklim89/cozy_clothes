import Link from 'next/link';

import { Button, buttonVariants } from '@/shared/ui/button';
import { Item, ItemContent } from '@/shared/ui/item';

export function CartWidgetOrder({ isAuth }: { isAuth: boolean }) {
  return (
    <Item variant="outline">
      <ItemContent>
        {isAuth ? (
          <Link className={buttonVariants({ size: 'lg' })} href="/order">
            Make order
          </Link>
        ) : (
          <Button size="lg">Login to make order</Button>
        )}
      </ItemContent>
    </Item>
  );
}
