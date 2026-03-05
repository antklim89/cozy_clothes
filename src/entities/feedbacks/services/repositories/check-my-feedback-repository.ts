import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

export async function checkMyFeedbackRepository({ userId, productId }: { userId: number; productId: number }) {
  try {
    const payload = await getPayload();
    const result = await payload.count({
      collection: 'feedback',
      where: {
        product: {
          equals: productId,
        },
        user: {
          equals: userId,
        },
      },
    });

    const exists = result.totalDocs > 0;
    return ok(exists);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to fetch feedbacks. Try again later.');
  }
}
