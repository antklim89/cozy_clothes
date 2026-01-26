'use client';
import { HeartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button, type ButtonProps } from '@/shared/ui/button';
import { FavoritesToggleButtonUnauthorized } from './favorites-toggle-button-unauthorized';
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

  if (!isAuthenticated) return <FavoritesToggleButtonUnauthorized {...props} />;
  return (
    <Button aria-label="Add product to favorites" onClick={() => toggleFavorites()} {...props}>
      <HeartIcon className={cn({ 'fill-primary-foreground': isFavorite })} />
    </Button>
  );
}
