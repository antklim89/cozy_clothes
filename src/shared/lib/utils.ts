import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ErrVariant } from './result';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormat = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: 'USD',
  style: 'currency',
  currencyDisplay: 'symbol',
  useGrouping: false,
});

export function getPrice(args: { price: number; discount?: number; qty?: number }): string {
  return priceFormat.format(calculatePrice(args));
}

export function calculatePrice({
  price = 0,
  discount = 0,
  qty = 1,
}: {
  price: number;
  discount?: number;
  qty?: number;
}): number {
  return (price / (1 - discount / 100)) * qty;
}

export function setFormErrors<T extends FieldValues>(form: UseFormReturn<T>, error?: ErrVariant | null): void {
  if (error == null) return;
  if (error.type === 'validation' && error.issues != null) {
    error.issues.forEach(({ path, message }) => {
      form.setError(path as 'root', { message });
    });
  } else {
    form.setError('root', { message: error.message });
  }
}
