import logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center">
        <Link className="mr-auto" href="/">
          <Image src={logo} alt="logo" className="h-10" />
        </Link>

        <nav>
          <ul className="flex gap-4">
            <li className="py-4">
              <Link className="py-4" href="/">
                HOME
              </Link>
            </li>
            <li className="py-4">
              <Link className="py-4" href="/about">
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
