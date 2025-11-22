import { injectDependency } from './index.js';

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
