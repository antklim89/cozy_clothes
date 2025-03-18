import { RichText } from '@payloadcms/richtext-lexical/react';
import type { AboutType } from '@/features/about/types';


export async function About({ about }: { about: AboutType }) {
  return (
    <section className="prose container my-8">
      <RichText data={about.text} />
    </section>
  );
}
