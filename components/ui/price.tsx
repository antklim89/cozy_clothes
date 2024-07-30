import { getPrice } from '@/lib/utils';

interface Props {
  price: number;
  discount?: number;
}

export const Price = ({ price, discount = 0 }: Props) => {
  return (
    <p className="flex flex-col items-end gap-1">
      <span className="text-xl font-bold tracking-tight text-gray-900">{getPrice({ price, discount })}</span>
      {discount > 0 && <span className="line-through text-md font-sans text-gray-500/70">{getPrice({ price })}</span>}
    </p>
  );
};

export default Price;
