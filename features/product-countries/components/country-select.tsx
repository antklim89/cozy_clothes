import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { fetchCountries } from '../actions';


interface Props {
  selectedValues: string[];
  onSelectedValuesChange: (value: string[]) => void;
}

export function CountrySelect({ onSelectedValuesChange, selectedValues }: Props) {
  const { data, isLoading } = useQuery({ queryKey: ['countries'], queryFn: async () => fetchCountries() });

  if (isLoading || data == null) return <Input disabled placeholder="Loading..." />;
  if (data.type === 'error') return null;

  return (
    <MultiSelect
      options={data.result.map(i => ({
        label: i.name,
        value: i.id.toString(),
      }))}
      selectedValues={selectedValues}
      onSelectedValuesChange={onSelectedValuesChange}
    />
  );
}
