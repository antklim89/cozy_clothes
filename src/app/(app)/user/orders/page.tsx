import { redirect } from 'next/navigation';

import { getOrders } from '@/entities/order/services';
import { ErrType } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { OrdersWidget, OrdersWidgetList } from '@/widgets/orders-widget/ui';

async function Page() {
  const { error, result: orders } = await getOrders();
  if (error && error.type === ErrType.UNAUTHENTICATED) return redirect('/');
  if (error) return <ErrorComponent error={error} />;

  return (
    <OrdersWidget>
      <OrdersWidgetList orders={orders} />
    </OrdersWidget>
  );
}

export default Page;
