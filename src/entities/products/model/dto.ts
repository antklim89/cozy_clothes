import type {
  Product,
  ProductBase,
  ProductCategory,
  ProductColor,
  ProductCountry,
  ProductMedia,
  ProductSize,
} from '@/shared/model/types/payload-types.generated';
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
    color: product.color as ProductColor,
    size: product.size as ProductSize,
    discount: product.discount ?? productBase.discount ?? 0,
    images: [...baseImages, ...images],
    price: product.price ?? productBase.price,
    productVariants: productVariants.map(i => ({
      id: i.id,
      color: i.color as ProductColor,
      size: i.size as ProductSize,
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
    isFavorite: product.favorites?.docs != null && product.favorites.docs.length > 0,
    title: product.title ?? undefined,
    baseTitle: productBase.title,
    category,
    country,
    color: product.color as ProductColor,
    size: product.size as ProductSize,
    discount: product.discount ?? productBase.discount ?? 0,
    imagePreview,
    price: product.price ?? productBase.price,
  };
}
