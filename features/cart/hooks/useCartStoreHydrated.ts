import { useEffect, useState } from 'react';
import { useCartStore } from '../store';


export function useCartStoreIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(useCartStore.persist.hasHydrated());
    useCartStore.persist.onHydrate(() => {
      setIsHydrated(true);
    });
  }, []);

  return isHydrated;
}
