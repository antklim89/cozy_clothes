'use client';
import { HeartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button, type ButtonProps } from '@/shared/ui/button';
import { useFavoritesQuery } from '../api';

export function FavoritesToggleButton({
  productId,
  isFavorite: isFavoriteDefault,
  isAuthenticated,
  ...props
}: {
  productId: number;
  isFavorite: boolean;
  isAuthenticated: boolean;
} & ButtonProps) {
  const { isFavorite = isFavoriteDefault, toggleFavorites } = useFavoritesQuery({
    productId,
    isFavorite: isFavoriteDefault,
  });

  return (
    <Button
      aria-label="add product to favorites"
      disabled={!isAuthenticated}
      onClick={() => toggleFavorites()}
      {...props}
    >
      <HeartIcon className={cn({ 'fill-primary-foreground': isFavorite })} />
    </Button>
  );
}
