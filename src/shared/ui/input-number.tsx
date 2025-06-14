import { Minus, Plus } from 'lucide-react';
import {
  createContext,
  use,
  useCallback,
  useMemo,
} from 'react';
import type {
  KeyboardEvent,
  ReactNode,
  RefObject,
} from 'react';
import { cn } from '@/src/shared/lib/utils';
import { Button } from './button';
import type { ButtonProps } from './button';
import { Input } from './input';
import type { InputProps } from './input';


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
}

const Context = createContext<ContextValue>({
  value: 1,
  handleDecrement: () => null,
  handleIncrement: () => null,
});

export function InputNumber({
  max = 9999,
  min = 1,
  value,
  onChange,
  children,
  className,
  ...props
}: InputNumberProps) {
  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, value - 1);
    onChange?.(newValue);
  }, [min, value, onChange]);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, value + 1);
    onChange?.(newValue);
  }, [max, value, onChange]);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
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
  }

  const contextValue = useMemo(() => ({
    value,
    handleDecrement,
    handleIncrement,
  }), [handleDecrement, handleIncrement, value]);

  return (
    <Context value={contextValue}>
      <div
        {...props}
        className={cn('flex gap-1', className)}
        onKeyDown={handleKeyDown}

      >
        {children}
      </div>
    </Context>
  );
}
export function InputNumberContent({ className, ...props }: InputProps & { ref?: RefObject<HTMLInputElement> }) {
  const { value } = use(Context);
  return (
    <Input
      readOnly
      tabIndex={-1}
      value={value}
      {...props}
      className={cn('w-20 text-xl text-center', className)}
    />
  );
}

export function InputNumberIncrement(props: ButtonProps & { ref?: RefObject<HTMLButtonElement> }) {
  const { handleIncrement } = use(Context);

  return (
    <Button onClick={handleIncrement} {...props}>
      <Plus />
    </Button>
  );
}

export function InputNumberDecrement(props: ButtonProps & { ref?: RefObject<HTMLButtonElement> }) {
  const { handleDecrement } = use(Context);

  return (
    <Button onClick={handleDecrement} {...props}>
      <Minus />
    </Button>
  );
}

