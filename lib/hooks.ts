import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';


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
  const [init, setInit] = useState(false);

  useEffect(() => setInit(true), []);
  if (!init) return ['', () => undefined];

  const setSearchState = (query?: string | null) => {
    if (typeof query !== 'string' && typeof query !== 'number') return;
    const params = new URLSearchParams(searchParams);
    params.set(key, query.toString());
    window.history.replaceState(null, '', `?${params}`);
  };

  const state = searchParams.get(key);

  return [state ?? defaultValue, setSearchState] as const;
}
