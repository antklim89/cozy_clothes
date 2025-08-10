import { TestimonialsBackground } from './testimonials-background';
import { TestimonialsItem } from './testimonials-item';
import type { TestimonialType } from '../model/types';


export async function Testimonials({ testimonials }: { testimonials: TestimonialType[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <TestimonialsBackground />

      <div className="container prose">
        <h2 className="text-3xl text-center pb-8">
          Join thousands of happy clients
        </h2>
        <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))]">
          {testimonials.map(testimonial => <TestimonialsItem {...testimonial} key={testimonial.id} />)}
        </div>
      </div>
    </section>
  );
}
