'use client';
import { useRouter } from 'next/navigation';
import type { ChangeEvent, ReactNode } from 'react';
import { useQueryState } from 'nuqs';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const priceSchema = z.string().trim().regex(/^\d*$/g);

const nuqsOptions = {
  shallow: false,
  throttleMs: 700,
  clearOnDefault: true,
  defaultValue: '',
};

export function ProductFilter({ filters }: { filters?: ReactNode }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useQueryState('search', nuqsOptions);
  const [minPriceInput, setMinPriceInput] = useQueryState('minPrice', nuqsOptions);
  const [maxPriceInput, setMaxPriceInput] = useQueryState('maxPrice', nuqsOptions);

  function handleReset() {
    router.replace(`?`);
  }

  function handleMaxPriceChange(e: ChangeEvent<HTMLInputElement>) {
    const result = priceSchema.safeParse(e.target.value);
    if (result.success) void setMaxPriceInput(result.data);
  }
  function handleMinPriceChange(e: ChangeEvent<HTMLInputElement>) {
    const result = priceSchema.safeParse(e.target.value);
    if (result.success) void setMinPriceInput(result.data);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    void setSearchInput(e.target.value);
  }

  return (
    <div className="flex flex-col gap-4">

      <Label className="flex flex-col gap-2">
        <span>Search</span>
        <Input
          placeholder="Product name..."
          value={searchInput}
          onChange={handleSearchChange}
        />
      </Label>

      <div className="flex gap-2">
        <Label className="flex flex-col gap-2">
          <span>Min Price</span>
          <Input
            placeholder="0"
            value={minPriceInput ?? ''}
            onChange={handleMinPriceChange}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          <span>Max Price</span>
          <Input
            placeholder="100 000"
            value={maxPriceInput ?? ''}
            onChange={handleMaxPriceChange}
          />
        </Label>
      </div>

      {filters}

      <Button
        className="w-full mt-2"
        type="reset"
        variant="outline"
        onClick={handleReset}
      >
        Clear
      </Button>
    </div>
  );
}

