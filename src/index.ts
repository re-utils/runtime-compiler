import { AsyncFunction } from './utils.js';

export type LocalDependency<T> = string & [T];
export type ExportedDependency<T> = number & [T];

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
export let asyncDeps = '';

/**
 * Wait for a dependency to resolve.
 * Use in `default` and `build` mode.
 * @param name
 */
export const waitDependency = (name: string): void => {
  asyncDeps += name + ',';
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

  asyncDeps = '';

  exportedDeps = '';
};

/**
 * Clear compiler data.
 * Use in `hydrate` mode.
 */
export const clearHydration = (): void => {
  externalDependencies.length = 0;
  cache = {};
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
  '{var $' +
  localDeps +
  (asyncDeps === ''
    ? ';_.push('
    : ';[' + asyncDeps + ']=await Promise.all([' + asyncDeps + ']);_.push(') +
  exportedDeps +
  ')}';

/**
 * Run hydration.
 */
export const hydrate = (): any[] => {
  const arr = [compiledDependencies].concat(externalDependencies);
  clearHydration();
  return arr;
};

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
export const evaluateSync = (): void => {
  try {
    Function(externalDependencyNames(), evaluateCode())(
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
export const evaluate = async (): Promise<void> =>
  AsyncFunction(externalDependencyNames(), evaluateCode())(
    compiledDependencies,
    ...externalDependencies,
  ).finally(clear);
