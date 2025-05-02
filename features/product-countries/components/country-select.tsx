import { useQuery } from '@tanstack/react-query';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { fetchCountries } from '../actions';


export function CountrySelect() {
  const { data, isLoading } = useQuery({ queryKey: ['countries'], queryFn: async () => fetchCountries() });

  const [searchInput, setSearchInput] = useQueryState('countries', parseAsArrayOf(parseAsString).withDefault([]).withOptions({ shallow: false }));

  if (isLoading || data == null) return <Input disabled placeholder="Loading..." />;
  if (data.type === 'error') return null;

  return (
    <Label className="flex flex-col gap-2">
      <span>Countries</span>
      <MultiSelect
        options={data.result.map(i => ({
          label: i.name,
          value: i.id.toString(),
        }))}
        selectedValues={searchInput}
        onSelectedValuesChange={async value => setSearchInput(value)}
      />
    </Label>

  );
}
