import { getProductCountries } from '@/entities/product-countries/services';
import { ProductCountrySelect } from '@/entities/product-countries/ui';

async function Page() {
  const { result: countries, type } = await getProductCountries();
  if (type === 'error') return null;

  return <ProductCountrySelect countries={countries} />;
}

export default Page;
