import '@/styles/main.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700-italic.css';
import '@fontsource/poppins/700.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import type { ReactNode } from 'react';
import process from 'node:process';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import NuqsProvider from '@/components/providers/nuqs-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { CategoryDropdownMenu, CategoryDropdownMenuFallback } from '@/features/product-categories';
import { fetchSeo } from '@/features/seo';
import { ThemeProvider } from '@/components/providers/theme-provider';


export async function generateMetadata(): Promise<Metadata> {
  const { type, result } = await fetchSeo();
  if (type === 'error') return {};

  const {
    title,
    creator,
    description,
    // image,
    keywords,
  } = result;

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <NuqsProvider>
        <QueryProvider>
          <body className="grid grid-rows-[auto_1fr_auto] h-screen">
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header
              categoryMenu={(
                <Suspense fallback={<CategoryDropdownMenuFallback />}>
                  <CategoryDropdownMenu />
                </Suspense>
              )}
            />
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
