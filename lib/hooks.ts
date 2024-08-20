import { useSearchParams } from 'next/navigation';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export function useSearchParamsState(
  key: string,
  defaultValue: string,
): [string, Dispatch<SetStateAction<string | number | null | undefined>>];

export function useSearchParamsState(
  key: string,
  defaultValue?: string | null,
): [string | undefined | null, Dispatch<SetStateAction<string | number | null | undefined>>];

export function useSearchParamsState(key: string, defaultValue?: string | null) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string | number | null | undefined>('');

  useEffect(() => {
    setQuery(searchParams.get(key) ?? defaultValue);
  }, [key, searchParams.get, defaultValue]);

  useEffect(() => {
    if (typeof query !== 'string' && typeof query !== 'number') return;
    const params = new URLSearchParams(searchParams);
    params.set(key, query.toString());
    window.history.replaceState(null, '', `?${params}`);
  }, [query, key, searchParams]);

  return [query?.toString() || defaultValue, setQuery] as const;
}
