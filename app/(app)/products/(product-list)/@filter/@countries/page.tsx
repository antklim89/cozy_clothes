import { CountrySelect } from '@/features/product-countries';
import { fetchCountries } from '@/features/product-countries/dal';


async function Page() {
  const { type, result: countries } = await fetchCountries();
  if (type === 'error') return null;

  return <CountrySelect countries={countries} />;
}

export default Page;
