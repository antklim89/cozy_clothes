import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/main.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700-italic.css';
import process from 'node:process';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { infoLoader } from '@/lib/content-loaders';


export async function generateMetadata(): Promise<Metadata> {
  const {
    title,
    creator,
    description,
    image,
    keywords,
  } = await infoLoader();

  return {
    metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
    authors: [],
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords,
    openGraph: {
      type: 'website',
      url: process.env.URL,
      title,
      description,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      title,
      description,
      creator,
    },
  };
}

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="grid grid-rows-[auto_1fr_auto] h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export const dynamic = 'force-static';

export default RootLayout;
