import { type ReactNode, Suspense } from 'react';

export function withSuspense<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>,
  fallback?: ReactNode,
): React.FC<T> {
  const WithSuspenseComponent: React.FC<T> = props => {
    return (
      <Suspense fallback={fallback}>
        <WrappedComponent {...(props as T)} />
      </Suspense>
    );
  };

  WithSuspenseComponent.displayName = `WithSuspense(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithSuspenseComponent;
}
