import { getPrice } from '@/lib/utils';


interface Props {
  price: number;
  discount?: number;
  qty?: number;
}

export function Price({ price, discount = 0, qty }: Props) {
  return (
    <p className="flex flex-col items-end gap-1">
      <span className="text-xl font-bold tracking-tight text-gray-900">
        {getPrice({ price, qty })}
      </span>

      {discount > 0 && (
        <>
          <span className="text-sm font-sans text-gray-800/70 text-nowrap">
            - {discount} %
          </span>

          <span className="line-through text-sm font-sans text-gray-500/70 text-nowrap">
            {getPrice({ price, discount, qty })}
          </span>
        </>
      )}
    </p>
  );
}
