import { cacheLife } from 'next/cache';

import { feedbackCache, getFeedbacks } from '@/entities/feedbacks/services';
import { Feedbacks } from '@/entities/feedbacks/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  'use cache';
  const { productId } = await ParamsSchema.parseAsync(await params);
  feedbackCache({ productId });
  cacheLife('seconds');

  const { result: feedbacks, error } = await getFeedbacks({ productId });
  if (error) return <ErrorComponent error={error} />;

  return <Feedbacks feedbacks={feedbacks} />;
}

export default Page;
