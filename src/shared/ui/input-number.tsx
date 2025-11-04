import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import { createContext, use, useCallback, useMemo } from 'react';
import { Minus, Plus } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import type { ButtonProps } from './button';
import { Button } from './button';
import type { InputProps } from './input';
import { Input } from './input';

export type InputNumberProps = { ref?: RefObject<HTMLDivElement> } & {
  max?: number;
  min?: number;
  value: number;
  onChange?: (num: number) => void;
  children: ReactNode;
  className?: string;
};

interface ContextValue {
  value: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => void;
}

const Context = createContext<ContextValue>({
  value: 1,
  handleDecrement: () => null,
  handleIncrement: () => null,
  handleKeyDown: () => null,
});

export function InputNumber({ max = 9999, min = 1, value, onChange, children, className, ...props }: InputNumberProps) {
  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, value - 1);
    onChange?.(newValue);
  }, [min, value, onChange]);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, value + 1);
    onChange?.(newValue);
  }, [max, value, onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
      switch (e.key) {
        case '+':
        case 'ArrowUp':
        case 'ArrowRight':
          handleIncrement();
          break;
        case '-':
        case 'ArrowDown':
        case 'ArrowLeft':
          handleDecrement();
          break;
        default:
          break;
      }
    },
    [handleDecrement, handleIncrement],
  );

  const contextValue = useMemo(
    () => ({
      value,
      handleDecrement,
      handleIncrement,
      handleKeyDown,
    }),
    [handleDecrement, handleIncrement, handleKeyDown, value],
  );

  return (
    <Context value={contextValue}>
      <div {...props} className={cn('flex gap-1', className)}>
        {children}
      </div>
    </Context>
  );
}
export function InputNumberContent({ className, ...props }: InputProps & { ref?: RefObject<HTMLInputElement> }) {
  const { value, handleKeyDown } = use(Context);
  return (
    <Input
      readOnly
      tabIndex={-1}
      value={value}
      {...props}
      className={cn('w-20 text-center text-xl', className)}
      onKeyDown={handleKeyDown}
    />
  );
}

export function InputNumberIncrement(props: ButtonProps & { ref?: RefObject<HTMLButtonElement> }) {
  const { handleIncrement, handleKeyDown } = use(Context);

  return (
    <Button onClick={handleIncrement} onKeyDown={handleKeyDown} {...props}>
      <Plus />
    </Button>
  );
}

export function InputNumberDecrement(props: ButtonProps & { ref?: RefObject<HTMLButtonElement> }) {
  const { handleDecrement, handleKeyDown } = use(Context);

  return (
    <Button onClick={handleDecrement} onKeyDown={handleKeyDown} {...props}>
      <Minus />
    </Button>
  );
}
