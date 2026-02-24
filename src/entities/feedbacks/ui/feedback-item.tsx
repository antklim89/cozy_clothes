import type { ReactNode } from 'react';
import { MessageCircleMoreIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Rating } from '@/shared/ui/rating';
import type { FeedbackType } from '../model/types';

export function FeedbackItem({ feedback, type }: { feedback: FeedbackType; type?: 'product' | 'personal' }) {
  const fullName = `${feedback.user.firstName || ''} ${feedback.user.lastName || ''}`.trim();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col justify-between md:flex-row">
        <div>
          {type === 'product' ? (
            <CardTitle className="text-3xl">{fullName}</CardTitle>
          ) : (
            <Link href={`/products/${feedback.product.id}`}>
              <CardTitle className="text-3xl">{feedback.product.title}</CardTitle>
            </Link>
          )}
          <span className="opacity-65">{new Date(feedback.createdAt).toLocaleString()}</span>
        </div>

        <Rating rating={feedback.rating} />
      </CardHeader>

      {feedback.images && feedback.images.length > 0 && (
        <CardContent className="flex gap-2">
          {feedback.images.map(image => (
            <Image
              key={image.id}
              alt="feedback image"
              blurDataURL={image.blurDataUrl}
              className="size-32 rounded-lg object-cover"
              height={image.height}
              placeholder="blur"
              src={image.url}
              width={image.width}
            />
          ))}
        </CardContent>
      )}
      <CardContent className="prose dark:prose-invert max-w-full space-y-4">
        <FeedbackComment
          comment={feedback.positiveReview}
          icon={<ThumbsUpIcon className="size-5 fill-emerald-600 stroke-emerald-600" />}
          title="Positive review"
        />
        <FeedbackComment
          comment={feedback.negativeReview}
          icon={<ThumbsDownIcon className="size-5 fill-rose-600 stroke-rose-600" />}
          title="Negative review"
        />
        <FeedbackComment
          comment={feedback.review}
          icon={<MessageCircleMoreIcon className="size-5" />}
          title="Common opinion"
        />
      </CardContent>
    </Card>
  );
}

function FeedbackComment({ comment, icon, title }: { title?: string; comment?: string; icon?: ReactNode }) {
  if (comment == null || comment.length === 0) return null;
  return (
    <CardDescription>
      <span className="flex items-center gap-2">
        {icon}
        <span className="font-bold">{title}:</span>
      </span>
      <span>{comment}</span>
    </CardDescription>
  );
}
