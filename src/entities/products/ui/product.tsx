import { RichText } from '@payloadcms/richtext-lexical/react';
import type { ProductType } from '@/src/entities/products/model';


export async function Product({ product }: { product: ProductType }) {
  return (
    <div className="prose dark:prose-invert px-4 flex flex-col">
      <h1>{product.baseTitle}</h1>
      <h3>{product.category.name}</h3>
      <RichText data={product.baseDescription} />
    </div>
  );
}
