import { useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon, Loader2 } from 'lucide-react';

import type { LoginType, RegisterType, UserType } from '@/entities/user/model';
import { LoginSchema, RegisterSchema } from '@/entities/user/model';
import type { PromiseResult } from '@/shared/lib/result';
import { cn, setFormErrors } from '@/shared/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

interface Props extends Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  type: 'login' | 'register';
  onSubmit: (data: LoginType | RegisterType) => PromiseResult<UserType, 'validation' | string>;
}

export function AuthForm({ className, type, onSubmit, ...props }: Props) {
  const id = useId();
  const form = useForm<LoginType | RegisterType>({
    resolver: zodResolver(type === 'login' ? LoginSchema : RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((_, info) => {
      if (info.type === 'change' && info.name === 'password' && form.formState.isSubmitted) {
        void form.trigger('confirmPassword');
      }
    });
    return unsubscribe;
  }, [form]);

  const handleSubmit = form.handleSubmit(async (data: LoginType | RegisterType) => {
    const { error } = await onSubmit(data);
    if (!error) form.reset();
    setFormErrors(form, error);
  });

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      {form.formState.errors.root && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Failed to {type}.</AlertTitle>
          <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
        </Alert>
      )}
      <FieldSet>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name + id}>E-mail</FieldLabel>
              <Input
                id={field.name + id}
                type="text"
                placeholder="example@mail.com"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name + id}>Password</FieldLabel>
              <Input
                id={field.name + id}
                aria-invalid={fieldState.invalid}
                placeholder="******"
                type="password"
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        {type === 'register' && (
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name + id}>Confirm Password</FieldLabel>
                <Input
                  id={field.name + id}
                  aria-invalid={fieldState.invalid}
                  placeholder="******"
                  type="password"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        )}

        <Button className="w-full space-x-4" disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
      </FieldSet>
    </form>
  );
}
