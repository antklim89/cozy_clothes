'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { FeedbackUpdateForm } from './feedback-update-form';
import { addFeedbackAction } from '../api/actions';
import type { CreateFeedbackInputType } from '../model/types';

export function FeedbackUpdate({ productId }: { productId: number }) {
  async function handleSubmit(input: CreateFeedbackInputType) {
    const result = await addFeedbackAction({ productId, input });
    if (result.error) return result;

    return result;
  }

  return (
    <Card className="container">
      <CardHeader>
        <CardTitle className="text-2xl">Add feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <FeedbackUpdateForm onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
}
