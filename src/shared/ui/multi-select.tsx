import { CheckIcon } from 'lucide-react';
import type { ComponentProps, RefObject } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/src/shared/ui/command';
import { cn } from '@/src/shared/lib/utils';


interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps extends ComponentProps<'button'> {
  options: Option[];
  onSelectedValuesChange: (value: string[]) => void;
  selectedValues: string[];
}


export function MultiSelect({
  options,
  onSelectedValuesChange,
  selectedValues,
}: MultiSelectProps & { ref?: RefObject<HTMLButtonElement> }) {
  function toggleOption(option: string) {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter(value => value !== option)
      : [...selectedValues, option];
    onSelectedValuesChange(newSelectedValues);
  }

  function handleClear() {
    onSelectedValuesChange([]);
  }

  function toggleAll() {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map(option => option.value);
      onSelectedValuesChange(allValues);
    }
  }

  return (
    <Command className="w-auto p-0 border">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <MultiSelectOption
            isSelected={selectedValues.length === options.length}
            text="(Select All)"
            onToggle={toggleAll}
          />

        </CommandGroup>
        <CommandGroup>
          {options.map(option => (
            <MultiSelectOption
              isSelected={selectedValues.includes(option.value)}
              key={option.value}
              text={option.label}
              onToggle={() => toggleOption(option.value)}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function MultiSelectOption({
  text,
  isSelected,
  onToggle,
}: {
  isSelected: boolean;
  text: string;
  onToggle: (value: string) => void;
}) {
  return (
    <CommandItem
      className="cursor-pointer"
      key="all"
      onSelect={onToggle}
    >
      <div
        className={cn(
          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
          isSelected
            ? 'bg-primary text-primary-foreground'
            : 'opacity-50 [&_svg]:invisible',
        )}
      >
        <CheckIcon className="h-4 w-4" />
      </div>
      <span>{text}</span>
    </CommandItem>
  );
}
