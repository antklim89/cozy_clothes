import Link from 'next/link';
import Markdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { heroLoader } from '@/lib/content-loaders';


export async function Hero() {
  const { imagePreview, text } = await heroLoader();

  return (
    <section className="bg-slate-100">
      <div className="container relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="flex flex-col items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
              <Markdown className="prose md:p-1">{text}</Markdown>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <Button asChild>
                <Link href="/products/all/1">Show more</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
          <PlaceholderImage
            alt="hero"
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
            height={720}
            src={imagePreview}
            width={480}
          />
        </div>
      </div>
    </section>
  );
}
