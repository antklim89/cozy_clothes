'use client';
import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { ErrorComponent } from '@/shared/ui/error-component';
import { Item } from '@/shared/ui/item';
import { Spinner } from '@/shared/ui/spinner';
import { CartWidgetTotal } from '@/widgets/cart-widget/ui';

export function CartTotalSection() {
  const cartQuery = useQuery(cartQueryOptions());

  if (cartQuery.isError) return <ErrorComponent error={cartQuery.error} />;
  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) {
    return (
      <Item variant="outline" className="flex justify-center py-24">
        <Spinner />
      </Item>
    );
  }

  return <CartWidgetTotal cartItems={cartQuery.data || []} />;
}
