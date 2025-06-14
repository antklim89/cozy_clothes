import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setClient(true);
  }, []);

  return isClient;
}
