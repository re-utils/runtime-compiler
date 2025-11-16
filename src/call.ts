import type { LocalDependency } from './index.ts';

const sym: unique symbol = Symbol();

/**
 * Inject dependency to an fn for later compilation
 */
export const inject = (
  deps: LocalDependency<any>[],
  fn: any,
): any =>
  (
    (fn[sym] = deps), fn
  );

/**
 * Get fn injected dependency list
 */
export const getDeps = (
  fn: any,
): LocalDependency<any>[] | undefined => fn[sym];
