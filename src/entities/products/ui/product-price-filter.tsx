'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Slider } from '@/shared/ui/slider';

const queryStateOptions = parseAsInteger.withOptions({
  shallow: false,
  limitUrlUpdates: { method: 'debounce', timeMs: 700 },
});
const MAX_PRICE = 1000000;

export function PriceFilter() {
  const [price, setPrice] = useQueryStates({
    minPrice: queryStateOptions.withDefault(0),
    maxPrice: queryStateOptions.withDefault(MAX_PRICE),
    page: parseAsInteger,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label>Min Price</Label>
          <Input
            max={price.maxPrice}
            min={0}
            type="number"
            value={price.minPrice}
            onChange={async e => setPrice({ minPrice: Number.parseInt(e.target.value || '0', 10), page: null })}
          />
        </div>
        <div className="flex-1">
          <Label>Max Price</Label>
          <Input
            min={price.minPrice}
            type="number"
            value={price.maxPrice}
            onChange={async e => setPrice({ maxPrice: Number.parseInt(e.target.value || '0', 10), page: null })}
          />
        </div>
      </div>
      <Slider
        max={MAX_PRICE}
        min={0}
        step={10}
        value={[price.minPrice, price.maxPrice]}
        onValueChange={([minValue, maxValue]) => {
          if (minValue != null) void setPrice({ minPrice: minValue, page: null });
          if (maxValue != null) void setPrice({ maxPrice: maxValue, page: null });
        }}
      />
    </div>
  );
}
