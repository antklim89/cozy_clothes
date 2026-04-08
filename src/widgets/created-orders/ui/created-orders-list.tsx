import type { OrderType } from '@/entities/order/model';
import { Order, OrdersEmpty } from '@/entities/order/ui';
import type { PaginatedData } from '@/shared/model/types/types';
import { Pagination } from '@/shared/ui/pagination';

export function CreatedOrdersList({ orders }: { orders: PaginatedData<OrderType> }) {
  return (
    <>
      {orders.docs.length > 0 && (
        <div className="mb-4 flex">
          <Pagination totalPages={orders.totalPages} page={orders.page} />
        </div>
      )}
      <div className="flex w-full flex-col gap-4">
        {orders.docs.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
      {orders.docs.length === 0 && <OrdersEmpty />}
    </>
  );
}
