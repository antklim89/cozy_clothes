import type { ReactNode } from 'react';
import '@/styles/main.css';
import { Header } from '@/components/layout';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700-italic.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-screen">
        <header className="shrink-0">
          <Header />
        </header>
        <main className="grow">{children}</main>
        <footer className="shrink-0">FOOTER</footer>
      </body>
    </html>
  );
};

export default RootLayout;