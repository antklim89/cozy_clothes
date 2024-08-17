import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useSearchParamsState(query: string, defaultValue: string | number = '') {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get(query) ?? defaultValue);
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(query, search.toString());
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }, [search, pathname, query, searchParams]);

  return [search.toString(), setSearch] as const;
}
