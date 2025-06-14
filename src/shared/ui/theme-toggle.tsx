'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsClient } from '@/hidden/hooks/use-is-client';
import { Button } from './button';
import { Skeleton } from './skeleton';


export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const isClient = useIsClient();
  if (!isClient) return <Skeleton className="rounded-full size-8" />;

  return (
    <Button suppressHydrationWarning variant="ghost" onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
