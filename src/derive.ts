import {
  injectDependency,
  injectExternal,
  type Expression,
  type Value,
} from './index.ts';

/**
 * Derive a value from other expressions.
 * Use in `default` and `build` mode.
 *
 * @example
 * const newValue = derive(
 *   ['Math.random()' as Expression<number>],
 *   (rand) => rand * 10
 * ); // '$[0](Math.random())'
 *
 * // In hydrate mode
 * injectExternal((rand) => rand * 10);
 */
export const derive = <const Expressions extends Expression<any>[], R>(
  values: Expressions,
  fn: (
    ...args: {
      [K in keyof Expressions]: Expressions[K]['~type'];
    }
  ) => R,
): Value<R> => (injectExternal(fn) + '(' + values.join() + ')') as any;

/**
 * Derive a value from other expressions.
 * Use in `default` and `build` mode.
 *
 * @example
 * const newValue = deriveAsync(
 *   ['await fetch("http://example.com")' as Expression<Response>],
 *   async (res) => await res.text()
 * ); // 'await $[0](await fetch("http://example.com"))'
 *
 * // In hydrate mode
 * injectExternal((rand) => rand * 10);
 */
export const deriveAsync = <const Expressions extends Expression<any>[], R>(
  values: Expressions,
  fn: (
    ...args: {
      [K in keyof Expressions]: Expressions[K]['~type'];
    }
  ) => Promise<R>,
): Expression<R> =>
  ('await ' + injectExternal(fn) + '(' + values.join() + ')') as any;

/**
 * Describe an injected call.
 */
export class InjectedCall<const in Args extends any[], const out R> {
  args: Expression<any>[];
  fn: (...args: Args) => R;

  constructor(args: Expression<any>[], fn: (...args: Args) => R) {
    this.args = args;
    this.fn = fn;
  }
}

/**
 * @param values
 * @param fn
 */
export const inject = <
  const Expressions extends Expression<any>[],
  Args extends any[],
  R,
>(
  values: Expressions,
  fn: (
    ...args: [
      ...{
        [K in keyof Expressions]: Expressions[K]['~type'];
      },
      ...Args,
    ]
  ) => R,
): InjectedCall<Args, R> => new InjectedCall(values, fn as any);

/**
 * Inject the external function, cache the access to a local dependency and run with provided args.
 */
export const cacheCall = <R>(
  fn: (...args: any[]) => R,
  args: string,
): Value<R> => (injectDependency(injectExternal(fn)) + '(' + args + ')') as any;
