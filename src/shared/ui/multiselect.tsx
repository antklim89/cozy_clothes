import { X } from 'lucide-react';
import {
  useCallback,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Badge } from '@/shared/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';

type Options = Record<'value' | 'label', string>;


export function MultiSelect({
  id,
  options,
  selectedOptions,
  onSelectOptions,
}: {
  id?: string;
  options: Options[];
  selectedOptions: Options[];
  onSelectOptions: (value: Options[],
  ) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleUnselect = useCallback((option: Options) => {
    onSelectOptions(selectedOptions.filter(s => s.value !== option.value));
  }, [selectedOptions, onSelectOptions]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          const newSelected = [...selectedOptions];
          newSelected.pop();
          onSelectOptions(newSelected);
        }
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    },
    [selectedOptions, onSelectOptions],
  );

  const filteredOptions = options?.filter(option => !selectedOptions?.includes(option));

  const handleSelect = useCallback((selectableOption: Options) => {
    setInputValue('');
    onSelectOptions([...selectedOptions, selectableOption]);
  }, [selectedOptions, onSelectOptions]);

  return (
    <Command
      className="overflow-visible bg-transparent"
      onKeyDown={handleKeyDown}
    >
      <div className="group flex items-center min-h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedOptions?.map(option => (
            <Badge key={option.value} variant="outline">
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                type="button"
                onClick={() => handleUnselect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          <CommandPrimitive.Input
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            id={id}
            placeholder="Select countries..."
            ref={inputRef}
            value={inputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onValueChange={setInputValue}
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && filteredOptions.length > 0
            ? (
                <div className="absolute mt-2 top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                  <CommandGroup className="h-full overflow-auto">
                    {filteredOptions.map(selectableOption => (
                      <CommandItem
                        className="cursor-pointer"
                        key={selectableOption.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => handleSelect(selectableOption)}
                      >
                        {selectableOption.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              )
            : null}
        </CommandList>
      </div>
    </Command>
  );
}
