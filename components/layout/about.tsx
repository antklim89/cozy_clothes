import { aboutLoader } from '@/lib/contentLoaders';
import { createBlurDataURL } from '@/lib/createBlurDataURL';
import Image from 'next/image';
import Markdown from 'react-markdown';

export const About = async () => {
  const about = await aboutLoader();
  if (!about) return null;
  const { text, image, values, valuesList } = about;

  const blurDataURL = await createBlurDataURL(image);

  return (
    <section className="prose container my-8">
      <Markdown>{text}</Markdown>

      <Image
        alt="About"
        src={image}
        className="w-full h-80 object-cover object-center rounded-3xl"
        placeholder="blur"
        width={1024}
        height={320}
        blurDataURL={blurDataURL}
      />

      <Markdown>{values}</Markdown>
      <div className="grid gap-0 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {valuesList.map(({ text, title }) => (
          <section key={title}>
            <h4>{title}</h4>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </section>
  );
};
