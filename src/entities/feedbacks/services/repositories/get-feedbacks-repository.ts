import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { paginationDto } from '@/shared/model/dto/pagination-dto';
import type { PayloadOptions } from '@/shared/model/types/types';
import { feedbackDto } from '../../model/dto';

export async function getFeedbacksRepository({
  productId,
  options,
}: {
  productId: number;
  options: Pick<PayloadOptions, 'page' | 'sort'>;
}) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'feedback',
      pagination: true,
      depth: 1,
      sort: options.sort || '-createdAt',
      page: options.page,
      where: {
        product: {
          equals: productId,
        },
      },
    });

    return ok(paginationDto(result, feedbackDto));
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to fetch feedbacks. Try again later.');
  }
}
