import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod/v4-mini';

import type { UserProfileType } from '@/entities/user/model';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { CreateOrderSchema } from '../models/schemas';

export function CreateOrderForm({
  onSubmit,
  userProfile,
}: {
  userProfile: UserProfileType;
  onSubmit: (values: z.infer<typeof CreateOrderSchema>) => void;
}) {
  const id = useId();
  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: userProfile,
  });

  const handleSubmit = form.handleSubmit(values => {
    onSubmit(values);
    form.reset(values);
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor={`firstName${id}`}>First name</FieldLabel>
        <Input
          autoComplete="name"
          id={`firstName${id}`}
          placeholder="Your first name..."
          {...form.register('firstName')}
        />
        <FieldError>{form.formState.errors.firstName?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor={`lastName${id}`}>Last Name</FieldLabel>
        <Input
          autoComplete="family-name"
          id={`firstName${id}`}
          placeholder="Your last name..."
          {...form.register('lastName')}
        />
        <FieldError>{form.formState.errors.lastName?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor={`address${id}`}>Address</FieldLabel>
        <Input
          autoComplete="shipping address-level1"
          id={`firstName${id}`}
          placeholder="Your address..."
          {...form.register('address')}
        />
        <FieldError>{form.formState.errors.address?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor={`phone${id}`}>Phone number</FieldLabel>
        <Input autoComplete="tel" id={`phone${id}`} placeholder="7 (555) 555-55-55" {...form.register('phone')} />
        <FieldError>{form.formState.errors.phone?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor={`comments${id}`}>Comments</FieldLabel>
        <Textarea id={`comments${id}`} {...form.register('comments')} />
        <FieldError>{form.formState.errors.phone?.message}</FieldError>
      </Field>

      <div className="flex justify-end">
        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
