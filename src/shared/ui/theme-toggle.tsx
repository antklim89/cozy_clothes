'use client';
import type { ComponentProps } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, SunMoonIcon } from 'lucide-react';

import { useIsClient } from '@/shared/hooks/use-is-client';
import { Button } from './button';
import { Skeleton } from './skeleton';

export function ThemeToggle(props: ComponentProps<typeof Button>) {
  const { setTheme, theme } = useTheme();

  const isClient = useIsClient();
  if (!isClient) {
    return (
      <Skeleton>
        <Button variant="ghost">
          <SunMoonIcon />
        </Button>
      </Skeleton>
    );
  }

  return (
    <Button variant="ghost" {...props} onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
