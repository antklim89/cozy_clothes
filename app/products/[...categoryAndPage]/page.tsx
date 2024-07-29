import { ProductsList } from '@/components/feature';
import { productsLoader } from '@/lib/contentLoaders';

type Props = {
  params: { categoryAndPage: [category: string, page: string] };
};

const PRODUCTS_PER_PAGE = 8;
const ALL_PRODUCTS = 'all';

export const dynamicParams = false;
export const generateStaticParams = async () => {
  const products = await productsLoader();

  const categoryCountMap: Record<string, number | undefined> = {};

  for (const product of products) {
    const categoryCount = categoryCountMap[product.category];
    if (categoryCount) {
      categoryCountMap[product.category] = categoryCount + 1;
    } else {
      categoryCountMap[product.category] = 1;
    }
  }

  const result: Props['params'][] = [];

  for (const [category, categoryCount = 0] of Object.entries(categoryCountMap)) {
    for (let page = 0; page < categoryCount / PRODUCTS_PER_PAGE; page++) {
      result.push({ categoryAndPage: [category, `${page + 1}`] });
    }
  }

  for (let page = 0; page < products.length / PRODUCTS_PER_PAGE; page++) {
    result.push({ categoryAndPage: [ALL_PRODUCTS, `${page + 1}`] });
  }

  return result;
};

function ProductPage({
  params: {
    categoryAndPage: [category, page],
  },
}: Props) {
  return <ProductsList category={category} page={Number(page)} />;
}

export default ProductPage;
