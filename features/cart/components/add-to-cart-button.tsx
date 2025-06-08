'use client';
import { Button } from '@/components/ui/button';
import type { ProductVariantType } from '@/features/product';
import { useAddCartMutation } from '../hooks/use-add-cart-mutation';
import { useCartQuery } from '../hooks/use-cart-query';
import { useRemoveCartMutation } from '../hooks/use-remove-cart-mutation';


interface Props {
  variant: ProductVariantType;
}

export function AddToCartButton({ variant }: Props) {
  const addCartMutation = useAddCartMutation();
  const removeCartMutation = useRemoveCartMutation();
  const { data: cart, isFetched } = useCartQuery();

  const hasCartItem = cart.some(i => i.variantId === variant.id);

  async function handleAddOrRemove() {
    if (hasCartItem) {
      await removeCartMutation.mutateAsync({
        variantId: variant.id,
      });
    } else {
      await addCartMutation.mutateAsync({
        variantId: variant.id,
        qty: 1,
      });
    }
  }
  const isLoading = !isFetched || addCartMutation.isPending || removeCartMutation.isPending;
  const buttonText = hasCartItem ? 'Remove From Cart' : 'Add To Cart';

  return (
    <Button className="w-full" disabled={isLoading} onClick={handleAddOrRemove}>
      {isLoading ? 'Loading...' : buttonText}
    </Button>
  );
}
