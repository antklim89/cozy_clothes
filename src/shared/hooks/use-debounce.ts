import { useCallback, useRef } from 'react';

export function useDebounce<T, U>(callback: (...args: U[]) => Promise<T>, delay = 700) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: U[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      return new Promise<T>(resolve => {
        timeoutRef.current = setTimeout(() => {
          void callback(...args).then(v => resolve(v));
        }, delay);
      });
    },
    [callback, delay],
  );

  return debouncedCallback;
}
