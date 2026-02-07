import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod/v4-mini';

import type { UserProfileType } from '@/entities/user/model';
import { Button } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { UpdateUserSchema } from '../models/schemas';

export function UserUpdateForm({
  onSubmit,
  userProfile,
}: {
  userProfile: UserProfileType;
  onSubmit: (values: z.infer<typeof UpdateUserSchema>) => void;
}) {
  const id = useId();
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: userProfile,
  });

  const handleSubmit = form.handleSubmit(async values => {
    await onSubmit(values);

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
        <Input autoComplete="tel" id={`firstName${id}`} placeholder="7 (555) 555-55-55" {...form.register('phone')} />
        <FieldError>{form.formState.errors.phone?.message}</FieldError>
      </Field>

      <div className="flex justify-end">
        <Button type="reset" variant="ghost" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
          Reset
        </Button>
        <Button type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
