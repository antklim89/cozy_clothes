import Image from 'next/image';
import { type ComponentProps, Suspense, use } from 'react';
import { defaultBlurDataUrl } from '@/constants';


type Props = Omit<ComponentProps<typeof Image>, 'blurDataURL' | 'placeholder' | 'src'> & {
  src: string;
};

export function PlaceholderImage({ className, ...props }: Props) {
  return (
    <Suspense fallback={(
      <Image
        blurDataURL={defaultBlurDataUrl}
        className={className}
        placeholder="blur"
        {...props}
      />
    )}
    >
      <PlaceholderImageRoot className={className} {...props} />
    </Suspense>
  );
}

function PlaceholderImageRoot({ src, ...props }: Props) {
  const createBlurDataURL = typeof window !== 'undefined' ? null : use(import('@/lib/create-blur-data-url').then(m => m.createBlurDataURL));
  const blurDataURL = createBlurDataURL ? use(createBlurDataURL(src)) : defaultBlurDataUrl;

  return (
    <Image
      blurDataURL={blurDataURL}
      className="w-full h-80 object-cover object-center rounded-3xl"
      height={320}
      placeholder="blur"
      src={src}
      width={1024}
      {...props}
    />
  );
}
