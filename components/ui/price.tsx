interface Props {
  price: number;
  discount?: number;
}

const priceFormat = Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: 'USD',
  style: 'currency',
  currencyDisplay: 'symbol',
  useGrouping: false,
});

function Price({ price, discount = 0 }: Props) {
  return (
    <p className="flex flex-col items-end gap-x-1">
      <span className="text-4xl font-bold tracking-tight text-gray-900">
        {discount > 0 ? priceFormat.format(price - price * (discount / 100)) : priceFormat.format(price)}
      </span>
      {discount > 0 && (
        <span className="line-through text-xl font-sans text-gray-500/70">{priceFormat.format(price)}</span>
      )}
    </p>
  );
}

export default Price;
