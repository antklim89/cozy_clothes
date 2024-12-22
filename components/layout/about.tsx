import Markdown from 'react-markdown';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { aboutLoader } from '@/lib/content-loaders';


export async function About() {
  const {
    text,
    image,
    values,
    valuesList,
  } = await aboutLoader();
  return (
    <section className="prose container my-8">
      <Markdown>{text}</Markdown>

      <PlaceholderImage
        alt="About"
        className="w-full h-80 object-cover object-center rounded-3xl"
        height={320}
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
