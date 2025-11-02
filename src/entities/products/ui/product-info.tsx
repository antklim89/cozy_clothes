import { RichText } from '@payloadcms/richtext-lexical/react';

import type { ProductType } from '@/entities/products/model';

export function ProductInfo({ product }: { product: ProductType }) {
  return (
    <div className="prose dark:prose-invert flex flex-col px-4">
      <h1>{product.baseTitle}</h1>
      <h3>{product.category.name}</h3>
      <RichText data={product.baseDescription} />
    </div>
  );
}
