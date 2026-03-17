import { type ChangeEvent, useId } from 'react';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';

import { buttonVariants } from '@/shared/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import type { CreateFeedbackInputType } from '../model/types';

export function FeedbackUploadImagesField({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<CreateFeedbackInputType, 'images'>;
  fieldState: ControllerFieldState;
}) {
  const id = useId();

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null || e.target.files.length === 0) return;

    const oldImages = field.value || [];
    field.onChange([...e.target.files, ...oldImages].slice(undefined, 5));
    e.target.value = '';
  }

  return (
    <Field>
      <FieldLabel className={buttonVariants({ variant: 'outline', size: 'lg' })} htmlFor={field.name + id}>
        <UploadIcon /> Upload images ({field.value?.length || 0} / 5)
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
      <FieldError errors={fieldState.error} />
    </Field>
  );
}
