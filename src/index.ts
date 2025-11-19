import { AsyncFunction } from './utils.js';

declare const _: unique symbol;
export type LocalDependency<T> = string & { [_]: T };
export type ExportedDependency<T> = number & { [_]: T };
export type InferDependency<T extends { [_]: any }> = T[typeof _];

/**
 * @internal
 */
export const compiledDependencies: any[] = [];
/**
 * @internal
 */
export const externalDependencies: any[] = [];
/**
 * @internal
 */
export let cache: Record<symbol, string> = {};
/**
 * @internal
 */
export let localDeps = '';
let localDepsCnt = 0;

/**
 * Inject a local dependency.
 * Use in `default` and `build` mode.
 */
export const injectDependency = <T>(val: string): LocalDependency<T> => {
  localDeps += ',$' + localDepsCnt + '=' + val;
  return ('$' + localDepsCnt++) as any;
};

/**
 * @internal
 */
export let exportedDeps = '';
let exportedDepsCnt = 0;

/**
 * Export a local dependency.
 * Use in `default` and `build` mode.
 * @param name
 */
export const exportDependency = <T>(
  name: LocalDependency<T>,
): ExportedDependency<T> => {
  exportedDeps += name + ',';
  return exportedDepsCnt++ as any;
};

/**
 * Mark a slot in compiled dependencies.
 * Use in `hydrate` mode.
 */
export const markExported = <T>(): ExportedDependency<T> =>
  exportedDepsCnt++ as any;

/**
 * Get the value of a dependency.
 * @param idx
 */
export const getDependency = <T>(idx: ExportedDependency<T>): T =>
  compiledDependencies[idx];

/**
 * Add extra code after dependency building
 */
export let extraCode = '';

/**
 * Add extra code after dependency building
 */
export const addExtraCode = (str: string): void => {
  extraCode += str;
};

/**
 * Inject an external dependency.
 */
export const injectExternalDependency = (val: any): string =>
  '_' + externalDependencies.push(val);

/**
 * Get external dependency names.
 * Use in `default` and `build` mode.
 */
export const externalDependencyNames = (): string => {
  let depsString = '_,';
  for (let i = 0; i < externalDependencies.length; i++)
    depsString += '_' + (i + 1) + ',';
  return depsString;
};

/**
 * Clear compiler data.
 * Use in `default` and `build` mode.
 */
export const clear = (): void => {
  externalDependencies.length = 0;
  cache = {};

  localDeps = '';
  localDepsCnt = 0;

  exportedDeps = '';

  extraCode = '';
};

/**
 * Equivalent to calling `evaluate`/`evaluateSync` in `default` or `build` mode.
 * Return the args that needs to be passed in.
 * Use in `hydrate` mode.
 *
 * @example
 * (() => {
 *   // Built content
 * })(finishHydration())
 */
export const finishHydration = (): any[] => {
  const args = [compiledDependencies].concat(externalDependencies);

  externalDependencies.length = 0;
  cache = {};

  return args;
};

/**
 * Lazily add the dependency when needed.
 */
export const lazyDependency = <T>(
  inject: (v: T) => string,
  val: T,
): (() => string) => {
  const ID = Symbol();
  return () => (cache[ID] ??= inject(val));
};

/**
 * Get evaluated code.
 * Use in `default` and `build` mode.
 */
export const evaluateCode = (): string =>
  '{var $' + localDeps + ';_.push(' + exportedDeps + ');' + extraCode + '}';

/**
 * Evaluate code to string.
 * Use in `default` and `build` mode.
 */
export const evaluateToString = (): string =>
  '(' + externalDependencyNames() + ')=>' + evaluateCode();

/**
 * Run evaluated code synchronously.
 * Use in `default` and `build` mode.
 */
export const evaluateSync = (): any => {
  try {
    return Function(externalDependencyNames(), evaluateCode())(
      compiledDependencies,
      ...externalDependencies,
    );
  } finally {
    clear();
  }
};

/**
 * Run evaluated code asynchronously.
 * Use in `default` and `build` mode.
 */
export const evaluate = async (): Promise<any> =>
  AsyncFunction(externalDependencyNames(), evaluateCode())(
    compiledDependencies,
    ...externalDependencies,
  ).finally(clear);
