import type { Media } from '@/shared/model/types/types';

export interface FeedbackType {
  id: number;
  productId: number;
  review?: string;
  positiveReview?: string;
  negativeReview?: string;
  rating: number;
  user: {
    id: number;
    firstName?: string;
    lastName?: string;
  };
  images?: Media[];
  updatedAt: string;
  createdAt: string;
}
