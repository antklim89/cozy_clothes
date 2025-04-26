import {
  CheckIcon,
  ChevronDown,
  XCircle,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps, KeyboardEvent, RefObject } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';


const multiSelectVariants = cva(
  'm-1',
  {
    variants: {
      variant: {
        default:
          'border-foreground/10 text-foreground bg-card hover:bg-card/80',
        secondary:
          'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        inverted: 'inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps extends ComponentProps<'button'>, VariantProps<typeof multiSelectVariants> {
  options: Option[];
  onSelectedValuesChange: (value: string[]) => void;
  selectedValues: string[];
  defaultValues?: string[];
  placeholder?: string;
  asChild?: boolean;
  className?: string;
  maxCount?: number;
}


export function MultiSelect({
  ref,
  options,
  onSelectedValuesChange,
  selectedValues,
  variant,
  defaultValues: defaultValue,
  placeholder = 'Select options',
  maxCount = 3,
  className,
  ...props
}: MultiSelectProps & { ref?: RefObject<HTMLButtonElement> }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setIsPopoverOpen(true);
    } else if (event.key === 'Backspace' && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues];
      newSelectedValues.pop();
      onSelectedValuesChange(newSelectedValues);
    }
  }

  function toggleOption(option: string) {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter(value => value !== option)
      : [...selectedValues, option];
    onSelectedValuesChange(newSelectedValues);
  }

  function handleClear() {
    onSelectedValuesChange([]);
  }

  function handleTogglePopover() {
    setIsPopoverOpen(prev => !prev);
  }

  function clearExtraOptions() {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    onSelectedValuesChange(newSelectedValues);
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
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          {...props}
          className={cn(
            'flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto',
            className,
          )}
          onClick={handleTogglePopover}
        >
          {selectedValues.length > 0
            ? (
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-wrap items-center">
                    {selectedValues.slice(0, maxCount).map(value => (
                      <SelectedValues
                        className={cn(multiSelectVariants({ variant }))}
                        key={value}
                        options={options}
                        toggleOption={toggleOption}
                        value={value}
                      />
                    ))}
                    {selectedValues.length > maxCount && (
                      <Badge
                        className={cn(
                          'bg-transparent text-foreground border-foreground/1 hover:bg-transparent',
                          multiSelectVariants({ variant }),
                        )}
                      >
                        {`+ ${selectedValues.length - maxCount} more`}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            clearExtraOptions();
                          }}
                        />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <XIcon
                      className="h-4 mx-2 cursor-pointer text-muted-foreground"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <Separator
                      className="flex min-h-6 h-full"
                      orientation="vertical"
                    />
                    <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                  </div>
                </div>
              )
            : (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span className="text-sm text-muted-foreground mx-3">
                    {placeholder}
                  </span>
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
              )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                key="all"
                onSelect={toggleAll}
              >
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.length === options.length
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible',
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <span>(Select All)</span>
              </CommandItem>
              {options.map(option => (
                <MultiSelectOption
                  key={option.value}
                  option={option}
                  selectedValues={selectedValues}
                  toggleOption={toggleOption}
                />
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem
                      className="flex-1 justify-center cursor-pointer"
                      onSelect={handleClear}
                    >
                      Clear
                    </CommandItem>
                    <Separator
                      className="flex min-h-6 h-full"
                      orientation="vertical"
                    />
                  </>
                )}
                <CommandItem
                  className="flex-1 justify-center cursor-pointer max-w-full"
                  onSelect={() => setIsPopoverOpen(false)}
                >
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function MultiSelectOption({ option, selectedValues, toggleOption }: { toggleOption: (arg: Option['value']) => void; option: Option; selectedValues: string[] }) {
  const isSelected = selectedValues.includes(option.value);
  return (
    <CommandItem
      className="cursor-pointer"
      onSelect={() => toggleOption(option.value)}
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
      <span>{option.label}</span>
    </CommandItem>
  );
}

function SelectedValues({
  toggleOption,
  value,
  options,
  className,
}: {
  value: string;
  toggleOption: (option: string) => void;
  options: Option[];
  className?: string;
}) {
  const option = options.find(o => o.value === value);
  return (
    <Badge className={className}>
      {option?.label}
      <XCircle
        className="ml-2 h-4 w-4 cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          toggleOption(value);
        }}
      />
    </Badge>
  );
}
