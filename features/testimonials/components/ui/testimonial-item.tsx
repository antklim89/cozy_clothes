import Image from 'next/image';
import type { TestimonialType } from '../../types';


export function TestimonialItem({ image, name, text }: TestimonialType) {
  return (
    <div className="flex flex-col">
      <div>
        <Image
          alt={name}
          blurDataURL={image.blurDataUrl}
          className="object-cover object-center w-20 h-20 rounded-full m-0"
          height={image.height}
          placeholder="blur"
          src={image.url}
          width={image.width}
        />
      </div>
      <div>
        <h3 className="text-lg my-4 font-medium text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
}
