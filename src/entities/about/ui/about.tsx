import { RichText } from '@payloadcms/richtext-lexical/react';

import type { AboutType } from '../model/types';

export function About({ about }: { about: AboutType }) {
  return (
    <section className="prose dark:prose-invert container my-8">
      <RichText className="" data={about.text} />
    </section>
  );
}
