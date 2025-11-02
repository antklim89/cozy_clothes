import Image from 'next/image';

import type { TestimonialType } from '../model/types';

export function TestimonialsItem({ image, name, text }: TestimonialType) {
  return (
    <div className="flex flex-col">
      <div>
        <Image
          alt={name}
          blurDataURL={image.blurDataUrl}
          className="m-0 h-20 w-20 rounded-full object-cover object-center"
          height={image.height}
          placeholder="blur"
          src={image.url}
          width={image.width}
        />
      </div>
      <div>
        <h3 className="my-4 font-medium text-gray-900 text-lg">{name}</h3>
        <p className="mt-2 text-gray-500 text-sm">{text}</p>
      </div>
    </div>
  );
}
