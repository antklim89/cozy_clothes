import { TestimonialsBackground } from './testimonials-background';
import { TestimonialsItem } from './testimonials-item';
import type { TestimonialType } from '../model/types';

export function Testimonials({ testimonials }: { testimonials: TestimonialType[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <TestimonialsBackground />

      <div className="container">
        <h2 className="prose pb-8 text-center text-3xl">Join thousands of happy clients</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-8">
          {testimonials.map(testimonial => (
            <TestimonialsItem {...testimonial} key={testimonial.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
