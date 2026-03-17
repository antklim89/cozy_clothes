'use client';

import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { FeedbackCreateForm } from './feedback-create-form';
import { addFeedbackAction } from '../api/actions';
import type { CreateFeedbackInputType } from '../model/types';

export function FeedbackCreate({ productId }: { productId: number }) {
  async function handleSubmit(input: CreateFeedbackInputType) {
    const result = await addFeedbackAction({ productId, input });
    if (result.error) {
      toast.error(result.error.message);
      return result;
    }

    return result;
  }

  return (
    <Card className="container">
      <CardHeader>
        <CardTitle className="text-2xl">Leave a feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <FeedbackCreateForm onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
}
