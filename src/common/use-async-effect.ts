import React from 'react';

function useAsyncEffect<V>(
  effect: (isMounted: () => boolean) => V | Promise<V>,
  inputs?: React.DependencyList
): void;
function useAsyncEffect<V>(
  effect: (isMounted: () => boolean) => V | Promise<V>,
  destroy: (result?: V) => void,
  inputs?: React.DependencyList
): void;
function useAsyncEffect<V>(
  effect: (isMounted: () => boolean) => V | Promise<V>,
  destroy?: ((result?: V) => void) | React.DependencyList,
  inputs?: React.DependencyList
): void {
  const hasDestroy = typeof destroy === 'function';
  React.useEffect(
    () => {
      let result: any;
      let mounted = true;
      const maybePromise = effect(() => {
        return mounted;
      });

      Promise.resolve(maybePromise).then((value) => {
        result = value;
      });

      return () => {
        mounted = false;

        if (hasDestroy) {
          (destroy as (result?: V) => void)(result);
        }
      };
    },
    hasDestroy ? inputs : ((destroy as any) as React.DependencyList)
  );
}

export default useAsyncEffect;
