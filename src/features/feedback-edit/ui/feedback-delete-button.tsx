'use client';
import { useTransition } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { removeFeedbackAction } from '../api/actions';

export function FeedbackDeleteButton({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const { error } = await removeFeedbackAction({ productId });
      if (error) toast.error(error.message);
    });
  }

  return <Button onClick={handleDelete}>{isPending ? <Spinner /> : <Trash />} Delete</Button>;
}
