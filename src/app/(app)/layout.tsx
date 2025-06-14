import '../main.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700-italic.css';
import '@fontsource/poppins/700.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSeo } from '@/src/entities/seo/dal';
import { Footer } from '@/src/widgets/footer/ui';
import { Header } from '@/src/widgets/header/ui';
import NuqsProvider from '../providers/nuqs-provider';
import { QueryProvider } from '../providers/query-provider';
import { ThemeProvider } from '../providers/theme-provider';


export async function generateMetadata(): Promise<Metadata> {
  const { type, result: seo } = await getSeo();
  if (type === 'error') return {};

  const {
    title,
    creator,
    description,
    // image,
    keywords,
  } = seo;

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
      // images: [
      //   {
      //     url: image,
      //     width: 800,
      //     height: 600,
      //   },
      // ],
    },
    twitter: {
      title,
      description,
      creator,
    },
  };
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <NuqsProvider>
        <QueryProvider>
          <body className="grid grid-rows-[auto_1fr_auto] h-screen">
            <ThemeProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </body>
        </QueryProvider>
      </NuqsProvider>
    </html>
  );
}

export default Layout;
