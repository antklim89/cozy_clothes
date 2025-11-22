import 'server-only';

import { getMe } from '@/entities/user/services';
import { err, ok } from '@/shared/lib/result';
import { addFavoritesRepository } from './repositories/add-favorites-repository';
import { removeFavoritesRepository } from './repositories/remove-favorites-repository';

export async function toggleFavorites({ productId, isFavorite }: { productId: number; isFavorite: boolean }) {
  const user = await getMe();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  if (isFavorite) {
    const result = await removeFavoritesRepository({ productId, userId: user.id });
    if (result.type === 'error') return result;
    return ok(false);
  }

  const result = await addFavoritesRepository({ productId, userId: user.id });
  if (result.type === 'error') return result;
  return ok(true);
}
