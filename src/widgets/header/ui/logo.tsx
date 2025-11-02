import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.svg';


export function Logo() {
  return (
    <Link className="flex items-center mr-auto" href="/">
      <Image
        alt="logo"
        className="h-12 mr-4 w-full"
        height={48}
        src={logo as StaticImageData}
        width={48}
      />
      <span className="hidden sm:inline text-nowrap text-2xl">Cozy Clothes</span>
    </Link>
  );
}
