'use client';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  createContext,
  use,
  useId,
  useMemo,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  RefObject,
} from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label';


const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) {
  const value = useMemo(() => ({ name: props.name }), [props.name]);

  return (
    <FormFieldContext value={value}>
      <Controller {...props} />
    </FormFieldContext>
  );
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

function useFormField() {
  const fieldContext = use(FormFieldContext);
  const itemContext = use(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (fieldContext == null) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

interface FormItemContextValue {
  id: string;
}


function FormItem({ ref, className, ...props }: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) {
  const id = useId();
  const value = useMemo(() => ({ id }), [id]);
  return (
    <FormItemContext value={value}>
      <div className={cn('space-y-2', className)} ref={ref} {...props} />
    </FormItemContext>
  );
}

function FormLabel({ ref, className, ...props }: ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { ref?: RefObject<ComponentRef<typeof LabelPrimitive.Root>> }) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  );
}

function FormControl({ ref, ...props }: ComponentPropsWithoutRef<typeof Slot> & { ref?: RefObject<ComponentRef<typeof Slot>> }) {
  const {
    error,
    formItemId,
    formDescriptionId,
    formMessageId,
  } = useFormField();

  return (
    <Slot
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
      aria-invalid={!!error}
      id={formItemId}
      ref={ref}
      {...props}
    />
  );
}

function FormDescription({ ref, className, ...props }: HTMLAttributes<HTMLParagraphElement> & { ref?: RefObject<HTMLParagraphElement> }) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      id={formDescriptionId}
      ref={ref}
      {...props}
    />
  );
}

function FormMessage({
  ref,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { ref?: RefObject<HTMLParagraphElement> }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (body == null) return null;

  return (
    <p
      className={cn('text-sm font-medium text-destructive', className)}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};
