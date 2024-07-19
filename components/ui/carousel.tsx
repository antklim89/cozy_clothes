'use client';
import dynamic from 'next/dynamic';
import type { CarouselProps } from 'nuka-carousel';
import type { ReactNode } from 'react';

const NukaCarousel = dynamic(() => import('nuka-carousel').then(({ Carousel }) => Carousel), { ssr: false });

interface Props extends CarouselProps {
  children: ReactNode;
}

function Carousel({ children, ...props }: Props) {
  return <NukaCarousel {...props}>{children}</NukaCarousel>;
}

export default Carousel;
