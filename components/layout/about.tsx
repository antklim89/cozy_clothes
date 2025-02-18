import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { fetchAbout } from '@/actions/about';


export async function About() {
  const {
    text,
    image,
    values,
    valuesList,
  } = await fetchAbout();

  return (
    <section className="prose container my-8">
      <RichText data={text} />

      <Image
        alt="About"
        blurDataURL={image.blurDataUrl}
        className="w-full h-80 object-cover object-center rounded-3xl"
        height={image.height}
        placeholder="blur"
        src={image.url}
        width={image.width}
      />

      <RichText data={values} />

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
