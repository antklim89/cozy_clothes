'use client';
import type { ComponentProps, HTMLAttributes, KeyboardEvent, RefObject } from 'react';
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = use(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  ref,
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & CarouselProps & { ref?: RefObject<HTMLDivElement> }) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;

    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!(api && setApi)) return;

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  const contextValue = useMemo(
    () => ({
      carouselRef,
      api,
      opts,
      orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  );

  return (
    <CarouselContext value={contextValue}>
      <section className={cn('relative', className)} ref={ref} onKeyDownCapture={handleKeyDown} {...props}>
        {children}
      </section>
    </CarouselContext>
  );
}

function CarouselContent({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: RefObject<HTMLDivElement> }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        ref={ref}
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLFieldSetElement> & { ref?: RefObject<HTMLFieldSetElement> }) {
  const { orientation } = useCarousel();

  return (
    <fieldset
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
      ref={ref}
      {...props}
    />
  );
}

function CarouselPrevious({
  ref,
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: ComponentProps<typeof Button> & { ref?: RefObject<HTMLButtonElement> }) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-translate-y-1/2 top-1/2 left-0'
          : '-top-12 -translate-x-1/2 left-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      ref={ref}
      size={size}
      variant={variant}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  ref,
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: ComponentProps<typeof Button> & { ref?: RefObject<HTMLButtonElement> }) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-translate-y-1/2 top-1/2 right-0'
          : '-bottom-12 -translate-x-1/2 left-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      ref={ref}
      size={size}
      variant={variant}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious };
