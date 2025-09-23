export type CompiledDependency<T> = number & [T];

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
 */
export const injectDependency = (val: string): string => {
  localDeps += ',$' + localDepsCnt + '=' + val;
  return '$' + localDepsCnt++;
};

/**
 * @internal
 */
export let asyncDeps = '';

/**
 * Wait for a dependency to resolve
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
 * Export a local dependency
 * @param name
 */
export const exportDependency = <T>(name: string): CompiledDependency<T> => {
  exportedDeps += name + ',';
  return exportedDepsCnt++ as any;
};

/**
 * Mark a slot in compiled dependencies
 */
export const markExported = <T>(): CompiledDependency<T> =>
  exportedDepsCnt++ as any;

/**
 * Get the value of a dependency
 * @param idx
 */
export const getDependency = <T>(idx: CompiledDependency<T>): T =>
  compiledDependencies[idx];

/**
 * Inject an external dependency
 */
export const injectExternalDependency = (val: any): string =>
  '_' + externalDependencies.push(val);

/**
 * Get external dependency names
 */
export const externalDependencyNames = (): string => {
  let depsString = '_,';
  for (let i = 0; i < externalDependencies.length; i++)
    depsString += '_' + (i + 1) + ',';
  return depsString;
};

/**
 * Clear compiler data
 */
export const clear = (): void => {
  externalDependencies.length = 0;
  cache = {};

  localDeps = '';
  localDepsCnt = 0;

  asyncDeps = '';

  exportedDeps = '';
  exportedDepsCnt = 0;
};

/**
 * Clear compiler data in hydration
 */
export const clearHydration = (): void => {
  externalDependencies.length = 0;
  cache = {};

  exportedDepsCnt = 0;
};

/**
 * Noop function
 */
export const noOp = () => '';

/**
 * Lazily add the dependency when needed
 */
export const lazyDependency = <T>(
  inject: (v: T) => string,
  val: T,
): () => string => {
  const ID = Symbol();
  return () => cache[ID] ??= inject(val);
}

/**
 * Get evaluate code
 */
export const evaluateCode = (): string =>
  '{var $' +
  localDeps +
  (asyncDeps === ''
    ? ';_.push('
    : ';[' + asyncDeps + ']=await Promise.all([' + asyncDeps + ']);_.push(') +
  exportedDeps +
  ')}';

export const AsyncFunction: typeof Function = (async () => {})
  .constructor as any;
