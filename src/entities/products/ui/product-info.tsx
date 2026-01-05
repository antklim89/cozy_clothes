import { RichText } from '@payloadcms/richtext-lexical/react';

import type { ProductType } from '@/entities/products/model';

export function ProductInfo({ product }: { product: ProductType }) {
  return (
    <div className="prose dark:prose-invert flex flex-col px-4">
      <h1>
        <span className="font-bold text-5xl">{product.baseTitle}</span>
        <br />
        <span className="font-md font-normal">{product.title}</span>
      </h1>
      <h3>{product.category.name}</h3>
      <RichText data={product.baseDescription} />
    </div>
  );
}
