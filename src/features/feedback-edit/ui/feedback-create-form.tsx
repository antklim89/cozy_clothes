import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon, Loader2Icon } from 'lucide-react';

import type { PromiseResult } from '@/shared/lib/result';
import { cn, setFormErrors } from '@/shared/lib/utils';
import { Alert, AlertTitle } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from '@/shared/ui/field';
import { RatingSelect } from '@/shared/ui/rating';
import { Textarea } from '@/shared/ui/textarea';
import { FeedbackUploadImagesField } from './feedback-upload-image-field';
import { CreateFeedbackInputSchema } from '../model/schemas';
import type { CreateFeedbackInputType } from '../model/types';

interface Props extends Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  onSubmit: (data: CreateFeedbackInputType) => PromiseResult<unknown, 'validation' | string>;
}

const DEFAULT_VALUES = {
  negativeReview: '',
  positiveReview: '',
  review: '',
  rating: 5,
  images: [],
};

export function FeedbackCreateForm({ className, onSubmit, ...props }: Props) {
  const id = useId();

  const form = useForm<CreateFeedbackInputType>({
    resolver: zodResolver(CreateFeedbackInputSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const handleSubmit = form.handleSubmit(async (data: CreateFeedbackInputType) => {
    const { error } = await onSubmit(data);
    if (!error) form.reset();
    setFormErrors(form, error);
  });

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
      {form.formState.errors.root && (
        <Alert variant="destructive" className="items-center">
          <AlertCircleIcon className="size-12" />
          <AlertTitle className="text-lg">{form.formState.errors.root.message}</AlertTitle>
        </Alert>
      )}
      <FieldSet>
        <Controller
          name="rating"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name + id}>Rating</FieldLabel>
              <RatingSelect value={field.value} onValueChange={v => field.onChange(v)} />
              <FieldError errors={fieldState.error} />
              <FieldDescription>
                You give this product {field.value} {field.value === 1 ? 'star' : 'stars'} out of 5
              </FieldDescription>
            </Field>
          )}
        />
        <Controller
          name="images"
          control={form.control}
          render={({ field, fieldState }) => <FeedbackUploadImagesField field={field} fieldState={fieldState} />}
        />
        <Controller
          name="review"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name + id}>Common opinion</FieldLabel>
              <Textarea
                id={field.name + id}
                placeholder="Enter your opinion about this product..."
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={fieldState.error} />
            </Field>
          )}
        />
        <Controller
          name="positiveReview"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name + id}>Positive review</FieldLabel>
              <Textarea
                id={field.name + id}
                placeholder="Enter your positive opinion about this product..."
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={fieldState.error} />
            </Field>
          )}
        />
        <Controller
          name="negativeReview"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name + id}>Negative review</FieldLabel>
              <Textarea
                id={field.name + id}
                placeholder="Enter what you didn&apos;t like about this product..."
                {...field}
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={fieldState.error} />
            </Field>
          )}
        />
        <div className="flex justify-end">
          <Button size="lg" className="space-x-4" disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
