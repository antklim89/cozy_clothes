import { type ChangeEvent, useId } from 'react';
import { Controller, type ControllerFieldState, type ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon, Loader2Icon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { IMAGE_HEIGHT, IMAGE_WIDTH, MAX_IMAGE_SIZE } from '@/entities/feedbacks/config';
import { imageTransform } from '@/shared/lib/image-transform';
import type { PromiseResult } from '@/shared/lib/result';
import { cn, setFormErrors } from '@/shared/lib/utils';
import { Alert, AlertTitle } from '@/shared/ui/alert';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { RatingSelect } from '@/shared/ui/rating';
import { Textarea } from '@/shared/ui/textarea';
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

const transformImageOptions = {
  maxWidth: IMAGE_WIDTH,
  maxHeight: IMAGE_HEIGHT,
  maxImageSize: MAX_IMAGE_SIZE,
  quality: 0.8,
};

export function FeedbackUpdateForm({ className, onSubmit, ...props }: Props) {
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
          <Button className="space-x-4" disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}

function FeedbackUploadImagesField({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<CreateFeedbackInputType, 'images'>;
  fieldState: ControllerFieldState;
}) {
  const id = useId();

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null || e.target.files.length === 0) return;

    const transformedImages = await Promise.all(
      Array.from(e.target.files, async file => {
        const { error, result } = await imageTransform({ file, ...transformImageOptions });
        if (error) return void toast.error(`Failed to upload image ${file.name}`);
        return result;
      }),
    );

    const filteredImages = transformedImages.filter(i => i != null);
    const oldImages = field.value || [];
    field.onChange([...filteredImages, ...oldImages].slice(undefined, 5));
    e.target.value = '';
  }

  return (
    <Field>
      <FieldLabel className={buttonVariants({ variant: 'outline' })} htmlFor={field.name + id}>
        <UploadIcon /> Upload files
      </FieldLabel>
      <Input
        id={field.name + id}
        className="hidden"
        type="file"
        accept="image/*"
        value={undefined}
        onChange={handleFileUpload}
        multiple
      />
      <div className="flex gap-2">
        {field.value?.map(image => (
          <Image
            className="size-48"
            key={image.name}
            src={URL.createObjectURL(image)}
            alt="Uploaded image"
            width={64}
            height={64}
          />
        ))}
      </div>
      <FieldDescription>Upload no more than 5 images</FieldDescription>
      <FieldError errors={fieldState.error} />
    </Field>
  );
}
