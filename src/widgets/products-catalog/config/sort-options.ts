import type { Option } from '@/shared/ui/query-sort';

export const sortOptions = [
  {
    value: '-createdAt',
    label: 'new',
  },
  {
    value: 'createdAt',
    label: 'old',
  },
  {
    value: 'price',
    label: 'cheaper',
  },
  {
    value: '-price',
    label: 'expensive',
  },
  {
    value: '-discount',
    label: 'big discounts',
  },
] as const satisfies Option[];
