'use client';
import type { ComponentProps } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { useIsClient } from '@/shared/hooks/use-is-client';
import { Button } from './button';
import { Skeleton } from './skeleton';

export function ThemeToggle(props: ComponentProps<typeof Button>) {
  const { setTheme, theme } = useTheme();

  const isClient = useIsClient();
  if (!isClient) return <Skeleton className="size-8 rounded-full" />;

  return (
    <Button
      suppressHydrationWarning
      variant="ghost"
      {...props}
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
