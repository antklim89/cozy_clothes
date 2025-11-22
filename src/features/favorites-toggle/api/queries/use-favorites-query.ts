import { useRef } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { useDebounce } from '@/shared/hooks/use-debounce';
import { toggleFavoritesAction } from '../actions';

export function useFavoritesQuery({
  productId,
  isFavorite: isFavoriteDefault,
}: {
  productId: number;
  isFavorite: boolean;
}) {
  const [toggleFavoritesActionDebounced, clear] = useDebounce(toggleFavoritesAction);
  const isFavoritePrev = useRef(isFavoriteDefault);
  const isFavoriteCurr = useRef(isFavoriteDefault);
  const queryClient = useQueryClient();

  const { data: isFavorite = isFavoriteDefault } = useSuspenseQuery({
    queryKey: ['favorites', { productId }],
    initialData: isFavoriteDefault,
    queryFn: async () => isFavoriteDefault,
  });

  const { mutateAsync: toggleFavorites } = useMutation({
    onMutate() {
      isFavoriteCurr.current = !isFavoriteCurr.current;
      queryClient.setQueryData<boolean>(['favorites', { productId }], oldData => !oldData);
    },
    mutationFn: async () => {
      if (isFavoritePrev.current === isFavoriteCurr.current) return clear();
      const result = await toggleFavoritesActionDebounced({ productId, isFavorite });
      if (result.type === 'ok') {
        isFavoritePrev.current = result.result;
        queryClient.setQueryData<boolean>(['favorites', { productId }], () => result.result);
      }
    },
  });

  return { isFavorite, toggleFavorites };
}
