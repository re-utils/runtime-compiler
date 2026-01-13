import {
  injectDependency,
  injectExternal,
  type Expression,
  type Value,
} from './index.ts';

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
