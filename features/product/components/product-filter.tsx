'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import qs from 'qs';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CountrySelect } from '@/features/product-countries';
import { ProductFilterSchema } from '@/features/product/schemas';


export function ProductFilter() {
  const router = useRouter();

  const form = useForm<z.infer<typeof ProductFilterSchema>>({
    resolver: zodResolver(ProductFilterSchema),
    async defaultValues() {
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      const { data = {} } = await ProductFilterSchema.safeParseAsync(query);
      return data;
    },
  });

  const handleSearch = form.handleSubmit((values) => {
    const searchParams = qs.stringify(values, { arrayFormat: 'repeat', addQueryPrefix: true, strictNullHandling: true });
    router.replace(searchParams);
  });

  function handleReset() {
    router.replace(`?`);
    form.reset({ search: undefined }, { keepDefaultValues: false, keepValues: false });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSearch}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Product name..." {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="minPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Price</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Price</FormLabel>
                <FormControl>
                  <Input placeholder="100 000" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="countries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Price</FormLabel>
              <FormControl>
                <CountrySelect selectedValues={field.value ?? []} onSelectedValuesChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full mt-2"
          type="submit"
        >
          Apply
        </Button>
        <Button
          className="w-full mt-2"
          type="reset"
          variant="outline"
          onClick={handleReset}
        >
          Clear
        </Button>
      </form>
    </Form>
  );
}

