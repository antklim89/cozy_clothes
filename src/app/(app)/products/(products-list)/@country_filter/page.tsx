import { getProductCountries } from '@/entities/product-countries/services';
import { ProductCountrySelect } from '@/entities/product-countries/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  const { result: countries, type, error } = await getProductCountries();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCountrySelect countries={countries} />;
}

export default Page;
