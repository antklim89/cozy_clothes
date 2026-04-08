import { OrdersListFallback } from '@/entities/order/ui';
import { CreatedOrders } from '@/widgets/created-orders/ui';

function Loading() {
  return (
    <CreatedOrders>
      <OrdersListFallback />
    </CreatedOrders>
  );
}

export default Loading;
