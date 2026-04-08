import { OrdersListFallback } from '@/entities/order/ui';
import { OrdersWidget } from '@/widgets/orders-widget/ui';

function Loading() {
  return (
    <OrdersWidget>
      <OrdersListFallback />
    </OrdersWidget>
  );
}

export default Loading;
