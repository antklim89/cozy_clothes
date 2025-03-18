import type { Populated } from '@/lib/types';
import type { Hero } from '@/payload-types';


export type HeroType = Populated<Hero, 'image'>;
