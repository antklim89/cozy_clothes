'use client';
import { useQuery } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';

import { meQueryOptions } from '@/entities/user/api';
import { cn } from '@/shared/lib/utils';
import { Button, type ButtonProps } from '@/shared/ui/button';
import { useFavoritesQuery } from '../api';

export function FavoritesToggleButton({
  productId,
  isFavorite: isFavoriteDefault,
  ...props
}: { productId: number; isFavorite: boolean } & ButtonProps) {
  const { isFavorite, toggleFavorites } = useFavoritesQuery({ productId, isFavorite: isFavoriteDefault });
  const { data: user, isFetched } = useQuery(meQueryOptions);

  return (
    <Button disabled={!isFetched || user == null} onClick={() => toggleFavorites()} {...props}>
      <HeartIcon className={cn({ 'fill-primary-foreground': isFetched && isFavorite })} />
    </Button>
  );
}
