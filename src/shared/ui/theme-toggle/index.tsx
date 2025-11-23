'use client';
import dynamic from 'next/dynamic';

import { ThemeToggleFallback } from './theme-toggle';

export const ThemeToggle = dynamic(() => import('./theme-toggle').then(m => ({ default: m.ThemeToggle })), {
  ssr: false,
  loading() {
    return <ThemeToggleFallback />;
  },
});
