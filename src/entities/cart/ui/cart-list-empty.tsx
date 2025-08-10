import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';


export function CartListEmpty() {
  return (
    <section className="container my-8">
      <Card>
        <CardHeader>
          <h3 className="text-xl">Shopping cart is empty</h3>
        </CardHeader>
        <CardContent>
          <Button>
            <Link href="/products">Catalog</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
