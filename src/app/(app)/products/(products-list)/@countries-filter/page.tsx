import { getProductCountries, productCountriesCache } from '@/entities/product-countries/services';
import { ProductCountriesSelect } from '@/entities/product-countries/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  productCountriesCache();
  const { result: countries, error } = await getProductCountries();
  if (error) return <ErrorComponent error={error} />;

  return <ProductCountriesSelect countries={countries} />;
}

export default Page;
