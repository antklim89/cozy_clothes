'use client';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

function Layout({ children }: LayoutProps<'/user'>) {
  const path = usePathname();
  const router = useRouter();

  return (
    <section className="container my-8">
      <Tabs value={path} onValueChange={v => router.push(v)}>
        <TabsList>
          <TabsTrigger value={'/user/profile' satisfies Route}>Profile</TabsTrigger>
          <TabsTrigger value={'/user/settings' satisfies Route}>Settings</TabsTrigger>
        </TabsList>
        <div className="my-8">{children}</div>
      </Tabs>
    </section>
  );
}

export default Layout;
