import type { LocalDependency } from './index.ts';

export type InferArgs<T extends LocalDependency<any>[]> = T extends [
  LocalDependency<infer First>,
  ...infer Rest extends LocalDependency<any>[],
]
  ? [First, ...InferArgs<Rest>]
  : [];

const sym: unique symbol = Symbol();

/**
 * Inject dependency to an fn for later compilation
 */
export const inject = <
  const Deps extends LocalDependency<any>[],
  Args extends any[],
  Ret,
>(
  deps: Deps,
  fn: (...args: [...InferArgs<Deps>, ...Args]) => Ret,
): ((...args: Args) => Ret) => {
  // @ts-ignore
  fn[sym] = deps;
  return fn as any;
};

/**
 * Get fn injected dependency list
 */
export const getDeps = (
  fn: (...args: any[]) => any,
): LocalDependency<any[]> | undefined => (fn as any)[sym] as any;
