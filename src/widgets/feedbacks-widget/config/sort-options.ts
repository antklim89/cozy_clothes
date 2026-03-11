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
    value: 'rating',
    label: 'low stars',
  },
  {
    value: '-rating',
    label: 'high rating',
  },
] as const satisfies Option[];
