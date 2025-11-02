import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../assets/logo.svg';

export function Logo() {
  return (
    <Link className="mr-auto flex items-center" href="/">
      <Image alt="logo" className="mr-4 h-12 w-full" height={48} src={logo as StaticImageData} width={48} />
      <span className="hidden text-nowrap text-2xl sm:inline">Cozy Clothes</span>
    </Link>
  );
}
