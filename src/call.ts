import type { InferDependency, LocalDependency } from './index.ts';

const sym: unique symbol = Symbol();

/**
 * Inject dependency to an fn for later compilation
 */
export const inject = <
  const Deps extends LocalDependency<any>[],
  const Args extends any[],
  const Ret,
>(
  deps: Deps,
  fn: (
    ...args: [
      ...{
        [K in keyof Deps]: InferDependency<Deps[K]>;
      },
      ...Args,
    ]
  ) => Ret,
): ((...args: Args) => Ret) =>
  (
    // @ts-ignore
    (fn[sym] = deps), fn
  );

/**
 * Get fn injected dependency list
 */
export const getDeps = (fn: any): LocalDependency<any>[] | undefined => fn[sym];
