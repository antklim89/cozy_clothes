'use client';
import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button, type ButtonProps } from '@/shared/ui/button';

export function FavoritesToggleButtonUnauthorized(props: ButtonProps) {
  return (
    <Button
      aria-label="Authenticate to add favorites"
      onClick={() => toast.error('Authenticate to add favorites', { id: 'FavoritesToggleButtonUnauthorized' })}
      {...props}
    >
      <HeartIcon />
    </Button>
  );
}
