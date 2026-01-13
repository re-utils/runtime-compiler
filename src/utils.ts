import {
  injectDependency,
  injectExternal,
  type Expression,
  type Value,
} from './index.ts';

/**
 * Placeholder for `hydrate` mode.
 */
export const noOp = () => '';

/**
 * Inject a serializable constant.
 * Use in `default` and `build` mode.
 */
export const injectConst = (val: any): string =>
  injectDependency(JSON.stringify(val));

/**
 * Inject a serializable argument list.
 * Use in `default` and `build` mode.
 */
export const injectArgsList = (list: any[]): string =>
  list.length !== 1 ? '...' + injectConst(list) : injectConst(list[0]);

/**
 * Async function constructor
 */
export const AsyncFunction: typeof Function = (async () => {})
  .constructor as any;

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
