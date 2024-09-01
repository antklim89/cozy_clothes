import Image from 'next/image';
import Markdown from 'react-markdown';
import { aboutLoader } from '@/lib/contentLoaders';
import { createBlurDataURL } from '@/lib/createBlurDataURL';


export async function About() {
  const { text, image, values, valuesList } = await aboutLoader();

  const blurDataURL = await createBlurDataURL(image);

  return (
    <section className="prose container my-8">
      <Markdown>{text}</Markdown>

      <Image
        alt="About"
        blurDataURL={blurDataURL}
        className="w-full h-80 object-cover object-center rounded-3xl"
        height={320}
        placeholder="blur"
        src={image}
        width={1024}
      />

      <Markdown>{values}</Markdown>
      <div className="grid gap-0 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {valuesList.map(i => (
          <section key={i.title}>
            <h4>{i.title}</h4>
            <p>{i.text}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
