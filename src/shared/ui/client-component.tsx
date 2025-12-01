import { type ReactNode, useEffect, useState } from 'react';

export function ClientComponent({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? children : fallback;
}
