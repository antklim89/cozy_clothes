import type { Feedback, Product, User } from '@/shared/model/types/payload-types.generated';
import type { Media } from '@/shared/model/types/types';
import type { FeedbackType } from './types';

export function feedbackDto(data: Feedback): FeedbackType {
  const user = data.user as User;
  const product = data.product as Product;
  return {
    id: data.id,
    product: {
      id: product.id,
      title: product.title,
    },
    review: data.review || undefined,
    positiveReview: data.positiveReview || undefined,
    negativeReview: data.negativeReview || undefined,
    rating: data.rating,
    user: {
      id: user.id,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
    },
    images: data.images as Media[],
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
}
