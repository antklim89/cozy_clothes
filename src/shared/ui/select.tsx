import { type ComponentProps, createContext, isValidElement, type ReactNode, useContext } from 'react';
import { Select as SelectPrimitive } from '@base-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const SelectContext = createContext<{
  indicatorPosition: 'left' | 'right';
  indicatorVisibility: boolean;
  indicator: ReactNode;
  icon: ReactNode;
}>({ indicatorPosition: 'left', indicator: null, indicatorVisibility: true, icon: null });

function Select<Value, Multiple extends boolean | undefined = false>({
  indicatorPosition = 'left',
  indicatorVisibility = true,
  indicator,
  icon,
  ...props
}: {
  indicatorPosition?: 'left' | 'right';
  indicatorVisibility?: boolean;
  indicator?: ReactNode;
  icon?: ReactNode;
} & SelectPrimitive.Root.Props<Value, Multiple>) {
  return (
    <SelectContext.Provider value={{ indicatorPosition, indicatorVisibility, indicator, icon }}>
      <SelectPrimitive.Root data-slot="select" {...props} />
    </SelectContext.Provider>
  );
}

function SelectGroup({ ...props }: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectPortal({ ...props }: ComponentProps<typeof SelectPrimitive.Portal>) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}

function SelectPositioner({ ...props }: ComponentProps<typeof SelectPrimitive.Positioner>) {
  return <SelectPrimitive.Positioner data-slot="select-positioner" {...props} />;
}

function SelectValue({
  placeholder,
  ...props
}: ComponentProps<typeof SelectPrimitive.Value> & {
  placeholder?: string;
}) {
  if (!placeholder) {
    return <SelectPrimitive.Value data-slot="select-value" {...props} />;
  }

  return (
    <SelectPrimitive.Value
      className="text-sm"
      render={(_, { value }) => {
        if (value) {
          return <SelectPrimitive.Value data-slot="select-value" {...props} />;
        }

        return (
          <span data-slot="select-value" className="text-muted-foreground">
            {placeholder}
          </span>
        );
      }}
      {...props}
    />
  );
}

function SelectMultipleValue<T>({
  items,
  render,
  placeholder,
}: {
  items: T[];
  render: (item: T) => ReactNode;
  placeholder?: string;
}) {
  return (
    <SelectValue className="flex flex-wrap gap-1 *:not-last:after:content-[',_']">
      {items.length === 0 && placeholder != null && <span className="opacity-70">{placeholder}</span>}
      {items.slice(0, 2).map(i => render(i))}
      {items.length > 2 && <span>{`+${items.length - 2} more`}</span>}
    </SelectValue>
  );
}

const selectTriggerVariants = cva(
  `
	  py-1 h-fit group relative flex w-fit items-center justify-between gap-2 rounded-md border whitespace-nowrap select-none
		shadow-xs transition-[color,box-shadow,border-color] outline-none
		focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
		aria-invalid:ring-destructive/50 aria-invalid:border-destructive
		data-disabled:pointer-events-none data-disabled:opacity-60
		*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2
		[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground
	`,
  {
    variants: {
      size: {
        xs: `
					min-h-7 px-2 text-xs gap-1 rounded-md
					**:data-[slot=select-icon]:size-3.5 **:data-[slot=select-icon]:-me-0.75
					[&_[data-slot=select-clear]>svg]:size-3 **:data-[slot=select-clear]:end-6
				`,
        sm: `
					min-h-9 px-2.5 text-xs gap-1 rounded-md
					**:data-[slot=select-icon]:size-3.5 **:data-[slot=select-icon]:-me-0.75
					[&_[data-slot=select-clear]>svg]:size-3 **:data-[slot=select-clear]:end-6
				`,
        md: `
					min-h-10 px-3 text-sm gap-1 rounded-md
					**:data-[slot=select-icon]:size-4 **:data-[slot=select-icon]:-me-1
					[&_[data-slot=select-clear]>svg]:size-3.5 **:data-[slot=select-clear]:end-7
				`,
        lg: `
					min-h-11 px-4 text-sm gap-1.5 rounded-md
					**:data-[slot=select-icon]:size-4 **:data-[slot=select-icon]:-me-1.25
					[&_[data-slot=select-clear]>svg]:size-3.5 **:data-[slot=select-clear]:end-8
				`,
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface SelectTriggerProps
  extends ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

function SelectTrigger({ className, children, size, ...props }: SelectTriggerProps) {
  const { icon } = useContext(SelectContext);

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        {icon && isValidElement(icon) ? (
          icon
        ) : (
          <ChevronDownIcon data-slot="select-icon" className="opacity-60 transition-transform duration-200" />
        )}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 2,
  align = 'start',
  alignOffset = 0,
  position = 'popper',
  ...props
}: ComponentProps<typeof SelectPrimitive.Popup> & {
  sideOffset?: SelectPrimitive.Positioner.Props['sideOffset'];
  side?: SelectPrimitive.Positioner.Props['side'];
  align?: SelectPrimitive.Positioner.Props['align'];
  alignOffset?: SelectPrimitive.Positioner.Props['alignOffset'];
  position?: 'popper' | 'item-aligned';
}) {
  return (
    <SelectPortal className="z-50">
      <SelectPositioner
        sideOffset={sideOffset}
        alignItemWithTrigger={position === 'item-aligned'}
        side={side}
        align={align}
        alignOffset={alignOffset}
        className="z-60"
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-closed:animate-out data-open:animate-in',
            position === 'item-aligned' && '[&_*[data-slot=select-item]]:min-w-(--anchor-width)',
            className,
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
        <SelectScrollDownButton />
      </SelectPositioner>
    </SelectPortal>
  );
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  const { indicatorPosition, indicatorVisibility, indicator } = useContext(SelectContext);

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`,
        indicatorPosition === 'left' ? 'ps-7 pe-2' : 'ps-2 pe-7',
        className,
      )}
      {...props}
    >
      {indicatorVisibility &&
        (indicator && isValidElement(indicator) ? (
          indicator
        ) : (
          <span
            className={cn(
              'absolute flex h-3.5 w-3.5 items-center justify-center',
              indicatorPosition === 'left' ? 'start-2' : 'end-2',
            )}
          >
            <SelectPrimitive.ItemIndicator data-slot="select-item-indicator">
              <CheckIcon className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
          </span>
        ))}
      <SelectPrimitive.ItemText data-slot="select-item-text">{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  const { indicatorPosition } = useContext(SelectContext);

  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'py-1.5 font-medium text-muted-foreground text-xs',
        indicatorPosition === 'left' ? 'ps-7 pe-2' : 'ps-2 pe-7',
        className,
      )}
      {...props}
    />
  );
}

function SelectIndicator({ children, className, ...props }: ComponentProps<typeof SelectPrimitive.ItemIndicator>) {
  const { indicatorPosition } = useContext(SelectContext);

  return (
    <span
      data-slot="select-indicator"
      className={cn(
        '-translate-y-1/2 absolute top-1/2 flex items-center justify-center',
        indicatorPosition === 'left' ? 'start-2' : 'end-2',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator>{children}</SelectPrimitive.ItemIndicator>
    </span>
  );
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('-mx-1 pointer-events-none my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        'fixed top-0 right-0 left-0 z-10 flex w-full cursor-default items-center justify-center rounded-t-md bg-popover py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        'fixed right-0 bottom-0 left-0 z-10 flex w-full cursor-default items-center justify-center rounded-b-md bg-popover py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectMultipleValue,
};
