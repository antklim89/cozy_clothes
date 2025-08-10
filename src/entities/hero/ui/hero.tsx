import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import type { HeroType } from '../model/types';


export async function Hero({ hero: { text, image } }: { hero: HeroType }) {
  return (
    <section className="bg-slate-100">
      <div className="container relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="flex flex-col items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-(--breakpoint-xl)">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <RichText className="prose md:p-1" data={text} />
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <Button asChild>
                <Link href="/products">Show more</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
          <Image
            alt="hero"
            blurDataURL={image.blurDataUrl}
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
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
