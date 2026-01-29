import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/shared/ui/button';
import type { HeroType } from '../model/types';

export function Hero({ hero: { text, image } }: { hero: HeroType }) {
  return (
    <section className="bg-slate-100">
      <div className="container relative flex flex-col py-16 lg:flex-col lg:pt-0 lg:pb-0">
        <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 lg:max-w-(--breakpoint-xl) lg:px-8">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <div className="mb-6 max-w-xl">
              <RichText className="prose md:p-1" data={text} />
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <Link className={buttonVariants({ size: 'lg', className: 'px-12' })} href="/products">
                Catalog
              </Link>
            </div>
          </div>
        </div>
        <div className="inset-y-0 right-0 mx-auto w-full max-w-xl px-4 lg:absolute lg:mx-0 lg:mb-0 lg:w-1/2 lg:max-w-full lg:pr-0 lg:pl-8 xl:px-0">
          <Image
            alt="hero"
            blurDataURL={image.blurDataUrl}
            className="h-56 w-full rounded object-cover shadow-lg sm:h-96 lg:h-full lg:rounded-none lg:shadow-none"
            height={image.height}
            placeholder="blur"
            src={image.url}
            width={image.width}
          />
        </div>
      </div>
    </section>
  );
}
