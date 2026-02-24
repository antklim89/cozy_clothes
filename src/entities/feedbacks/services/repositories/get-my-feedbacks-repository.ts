import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { paginationDto } from '@/shared/model/dto/pagination-dto';
import { feedbackDto } from '../../model/dto';

export async function getMyFeedbacksRepository({ userId }: { userId: number }) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'feedback',
      pagination: true,
      depth: 1,
      where: {
        user: { equals: userId },
      },
    });

    return ok(paginationDto(result, feedbackDto));
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to fetch feedbacks. Try again later.');
  }
}
