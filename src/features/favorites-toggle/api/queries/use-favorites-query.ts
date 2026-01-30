import { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { toggleFavoritesAction } from '../actions';

const FAVORITES_QUERY_KEY = 'favorites';

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

  const { data: isFavorite = isFavoriteDefault } = useQuery({
    queryKey: [FAVORITES_QUERY_KEY, { productId }],
    queryFn: async () => isFavoriteDefault,
  });

  const { mutateAsync: toggleFavorites } = useMutation({
    onMutate() {
      isFavoriteCurr.current = !isFavoriteCurr.current;
      queryClient.setQueryData<boolean>([FAVORITES_QUERY_KEY, { productId }], oldData => !oldData);
    },
    mutationFn: async () => {
      if (isFavoritePrev.current === isFavoriteCurr.current) return clear();
      const { result: newIsFavorite } = await toggleFavoritesActionDebounced({ productId, isFavorite });
      if (newIsFavorite) {
        isFavoritePrev.current = newIsFavorite;
        queryClient.setQueryData<boolean>([FAVORITES_QUERY_KEY, { productId }], () => newIsFavorite);
      }
    },
  });

  return { isFavorite, toggleFavorites };
}
