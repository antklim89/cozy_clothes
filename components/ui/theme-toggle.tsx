'use client';
import { useTheme } from "next-themes"
import { Button } from "./button"
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Skeleton } from "./skeleton";


export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <Skeleton className="rounded-full size-8" />;

  return (
    <Button suppressHydrationWarning onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
