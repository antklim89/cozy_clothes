import { redirect } from 'next/navigation';

import { getCart } from '@/entities/cart/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { OrderWidgetCartList } from '@/widgets/order-widget/ui';

export async function CartSection() {
  const { result: cart, error } = await getCart();
  if (error) return <ErrorComponent error={error} />;
  if (cart.length === 0) redirect('/cart');

  return <OrderWidgetCartList cart={cart} />;
}
