import type {
  Product,
  ProductBase,
  ProductCategory,
  ProductCountry,
  ProductMedia,
} from '@/payload-types';
import type { ProductPreviewType, ProductType } from './types';


export function productDto(product: Product): ProductType {
  const productBase = product.productBase as ProductBase;
  const productVariants = (productBase.productVariants?.docs ?? []) as Product[];
  const category = productBase.category as ProductCategory;
  const country = productBase.country as ProductCountry;
  const baseImages = (productBase.images ?? []) as ProductMedia[];
  const images = (product.images ?? []) as ProductMedia[];

  return {
    id: product.id,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    title: product.title ?? undefined,
    baseTitle: productBase.title,
    description: product.description ?? undefined,
    baseDescription: productBase.description,
    category,
    country,
    colorCode: product.colorCode,
    colorName: product.colorName,
    size: product.size,
    discount: product.discount ?? productBase.discount ?? 0,
    images: [...baseImages, ...images],
    price: product.price ?? productBase.price,
    productVariants: productVariants.map(i => ({
      colorCode: i.colorCode,
      colorName: i.colorName,
      id: i.id,
      size: i.size,
    })),
  };
}

export function productPreviewDto(product: Product): ProductPreviewType {
  const productBase = product.productBase as ProductBase;
  const category = productBase.category as ProductCategory;
  const country = productBase.country as ProductCountry;
  const imagePreview = product.imagePreview as ProductMedia;

  return {
    id: product.id,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    title: product.title ?? undefined,
    baseTitle: productBase.title,
    category,
    country,
    discount: product.discount ?? productBase.discount ?? 0,
    imagePreview,
    price: product.price ?? productBase.price,
  };
}
