import { RichTextImproved } from '@/components/ui/rich-text-improved';
import type { AboutType } from '../types';


export async function About({ about }: { about: AboutType }) {
  return (
    <section className="prose dark:prose-invert container my-8">
      <RichTextImproved data={about.text} />
    </section>
  );
}
