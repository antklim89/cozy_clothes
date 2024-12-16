import Image from 'next/image';
import { testimonialsLoader } from '@/lib/contentLoaders';


export async function Testimonials() {
  const testimonials = await testimonialsLoader();

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="container prose">
        <h2 className="text-3xl text-center pb-8">Join thousands of happy clients</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-y-12">
          {testimonials.map(({
            id,
            image,
            name,
            text,
          }) => (
            <div className="flex flex-col" key={id}>
              <div>
                <Image
                  alt={name}
                  className="object-cover object-center w-20 h-20 rounded-full m-0"
                  height={120}
                  src={image}
                  width={120}
                />
              </div>
              <div>
                <h3 className="text-lg my-4 font-medium text-gray-900">{name}</h3>
                <p className="mt-2 text-sm text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
