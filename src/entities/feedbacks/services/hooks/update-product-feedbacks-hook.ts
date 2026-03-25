import type { PayloadRequest } from 'payload';

import type { Feedback } from '@/shared/model/types/payload-types.generated';

export async function updateProductFeedbacksHook({ req, doc }: { doc: Feedback; req: PayloadRequest }) {
  const totalFeedbacks = await req.payload.find({
    collection: 'feedback',
    limit: Number.MAX_SAFE_INTEGER,
    where: {
      product: { equals: typeof doc.product === 'number' ? doc.product : doc.product.id },
    },
    req,
  });
  const feedbacks = totalFeedbacks.docs;
  const averageFeedback = feedbacks.reduce((acc, i) => acc + i.rating, 0) / feedbacks.length;

  await req.payload.update({
    collection: 'products',
    where: {
      id: { equals: typeof doc.product === 'number' ? doc.product : doc.product.id },
    },
    data: {
      totalFeedbacks: feedbacks.length,
      averageFeedback,
    },
    req,
  });
}
