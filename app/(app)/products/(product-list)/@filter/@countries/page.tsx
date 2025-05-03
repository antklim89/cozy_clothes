import { CountrySelect, fetchCountries } from '@/features/product-countries';


async function Page() {
  const { type, result: countries } = await fetchCountries();
  if (type === 'error') return null;

  return <CountrySelect countries={countries} />;
}

export default Page;
