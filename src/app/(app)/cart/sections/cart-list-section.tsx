'use client';
import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { CartListFallback } from '@/entities/cart/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { CartWidgetList } from '@/widgets/cart-widget/ui';

export function CartListSection() {
  const cartQuery = useQuery(cartQueryOptions());

  if (cartQuery.isError) return <ErrorComponent error={cartQuery.error} />;
  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <CartListFallback />;

  return <CartWidgetList cartItems={cartQuery.data || []} />;
}
