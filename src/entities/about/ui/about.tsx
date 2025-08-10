import { RichTextImproved } from '@/shared/ui/rich-text-improved';
import type { AboutType } from '../model/types';


export async function About({ about }: { about: AboutType }) {
  return (
    <section className="prose dark:prose-invert container my-8">
      <RichTextImproved data={about.text} />
    </section>
  );
}
