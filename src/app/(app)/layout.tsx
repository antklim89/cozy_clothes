import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700-italic.css';
import '@fontsource/poppins/700.css';
import type { ReactNode } from 'react';
import '../style/main.css';

import { Footer } from '@/widgets/footer/ui';
import { Header } from '@/widgets/header/ui';
import NuqsProvider from '../providers/nuqs-provider';
import { QueryProvider } from '../providers/query-provider';
import { ThemeProvider } from '../providers/theme-provider';

function Layout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <NuqsProvider>
        <QueryProvider>
          <body className="grid h-screen grid-rows-[auto_1fr_auto]">
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

export { generateMetadata } from './seo';
