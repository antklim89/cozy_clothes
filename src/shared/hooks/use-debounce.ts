import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: never[]) => Promise<unknown>>(callback: T, delay = 700) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      return new Promise<ReturnType<T>>(resolve => {
        timeoutRef.current = setTimeout(() => {
          callback(...args).then(resolve);
        }, delay);
      });
    },
    [callback, delay],
  );

  return debouncedCallback;
}
