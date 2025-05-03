import { Background } from './ui/background';
import { TestimonialItem } from './ui/testimonial-item';
import type { TestimonialType } from '../types';


export async function Testimonials({ testimonials }: { testimonials: TestimonialType[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Background />

      <div className="container prose">
        <h2 className="text-3xl text-center pb-8">
          Join thousands of happy clients
        </h2>
        <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))]">
          {testimonials.map(testimonial => <TestimonialItem {...testimonial} key={testimonial.id} />)}
        </div>
      </div>
    </section>
  );
}
