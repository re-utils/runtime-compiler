import type { Identifier, InferExpression } from './index.ts';

const sym: unique symbol = Symbol();
type sym = typeof sym;

export interface InjectedCall<in out Deps extends Identifier<any>[]> {
  [sym]: Deps;
}

/**
 * Inject dependency to an fn for later compilation
 */
export const inject = <
  const Deps extends Identifier<any>[],
  const Args extends any[],
  const Ret,
>(
  deps: Deps,
  fn: (
    ...args: [
      ...{
        [K in keyof Deps]: InferExpression<Deps[K]>;
      },
      ...Args,
    ]
  ) => Ret,
): ((...args: Args) => Ret) & InjectedCall<Deps> =>
  (
    // @ts-ignore
    (fn[sym] = deps), fn
  );

interface GetDepsFn {
  <Deps extends Identifier<any>[]>(fn: InjectedCall<Deps>): Deps;
  (fn: any): Identifier<any>[] | undefined;
}

/**
 * Get fn injected dependency list
 */
export const getDeps: GetDepsFn = (fn: any) => fn[sym];
