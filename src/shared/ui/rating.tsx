import { StarIcon } from 'lucide-react';

import { Button } from './button';
import { cn } from '../lib/utils';

export function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <StarIcon className={cn('stroke-amber-700', { 'fill-amber-600': i < rating })} key={i} />
      ))}
    </div>
  );
}

export function RatingTotal({ rating, total }: { rating: number; total?: number }) {
  return (
    <div className="flex items-center gap-2">
      <StarIcon className="fill-amber-600 stroke-amber-700" />
      <span className="text-2xl">{rating.toFixed(1)} </span>
      <span className="opacity-65">{total}</span>
    </div>
  );
}

export function RatingSelect({ value, onValueChange }: { value: number; onValueChange: (value: number) => void }) {
  return (
    <div className="flex gap-6">
      {Array.from({ length: 5 }, (_, i) => (
        <Button
          // biome-ignore lint/suspicious/noArrayIndexKey: ok
          key={i}
          onClick={() => onValueChange(i + 1)}
          variant="ghost"
          size="icon-xl"
        >
          <StarIcon
            className={cn('fill-transparent stroke-amber-700 transition-[fill]', {
              'fill-amber-600': i < value,
            })}
          />
        </Button>
      ))}
    </div>
  );
}
