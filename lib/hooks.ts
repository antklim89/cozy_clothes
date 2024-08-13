import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearchParamsState(query: string, defaultValue: string | number = '') {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const setSearchParamsState = (value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const valueStr = value.toString();
    if (valueStr.trim().length === 0) {
      newSearchParams.delete(query);
    } else {
      newSearchParams.set(query, valueStr);
    }
    replace(`${pathname}?${newSearchParams}`, { scroll: false });
  };

  const searchParamsState = searchParams.get(query) ?? defaultValue.toString();

  return [searchParamsState, setSearchParamsState] as const;
}
