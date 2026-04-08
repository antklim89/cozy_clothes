import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { paginationDto } from '@/shared/model/dto/pagination-dto';
import { orderDto } from '../../model/dto';

export async function getOrdersRepository({ userId }: { userId: number }) {
  try {
    const payload = await getPayload();
    const payloadResult = await payload.find({
      collection: 'orders',
      depth: 1,
      pagination: true,
      where: {
        user: {
          equals: userId,
        },
      },
    });

    return ok(paginationDto(payloadResult, orderDto));
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to get cart.');
  }
}
