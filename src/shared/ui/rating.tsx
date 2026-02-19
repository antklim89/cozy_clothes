import { StarIcon } from 'lucide-react';

import { cn } from '../lib/utils';

export function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: ok
        <StarIcon className={cn('stroke-amber-700', { 'fill-amber-600': i + 1 <= rating })} key={i} />
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
