import { getPrice } from '@/lib/utils';

interface Props {
  price: number;
  discount?: number;
}

function Price({ price, discount = 0 }: Props) {
  return (
    <p className="flex flex-col items-end gap-x-1">
      <span className="text-4xl font-bold tracking-tight text-gray-900">{getPrice(price, discount)}</span>
      {discount > 0 && <span className="line-through text-xl font-sans text-gray-500/70">{getPrice(price)}</span>}
    </p>
  );
}

export default Price;
