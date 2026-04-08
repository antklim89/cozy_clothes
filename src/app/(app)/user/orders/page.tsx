import { redirect } from 'next/navigation';

import { getOrders } from '@/entities/order/services';
import { ErrType } from '@/shared/lib/result';
import { ErrorComponent } from '@/shared/ui/error-component';
import { CreatedOrders, CreatedOrdersList } from '@/widgets/created-orders/ui';

async function Page() {
  const { error, result: orders } = await getOrders();
  if (error && error.type === ErrType.UNAUTHENTICATED) return redirect('/');
  if (error) return <ErrorComponent error={error} />;

  return (
    <CreatedOrders>
      <CreatedOrdersList orders={orders} />
    </CreatedOrders>
  );
}

export default Page;
