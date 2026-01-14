export type Expression<T> = string & {
  '~type': T;
};

export type Value<T> = Expression<T> & {
  '~value': 0;
};

export type Identifier<T> = Value<T> & {
  '~id': 0;
};

export type ExportedDependency<T> = number & {
  '~type': T;
};

/**
 * External dependencies
 */
export const externals: any[] = [];

let localDeps = '';
let localDepsCnt = 0;

let exportDeps = '';

interface InjectDependencyFn {
  <T>(val: Expression<T>): Identifier<T>;
  <T>(val: string): Identifier<T>;
}

/**
 * Inject a local dependency.
 * Use in `default` and `build` mode.
 */
export const injectDependency: InjectDependencyFn = (val) => {
  localDeps += ',$' + localDepsCnt + '=' + val;
  return ('$' + localDepsCnt++) as any;
};

/**
 * Export a local dependency.
 * Use in `default` and `build` mode.
 * @param value
 */
export const exportDependency = <T>(
  value: Expression<T>,
): ExportedDependency<T> => (
  (exportDeps += ';$[' + externals.length + ']=' + value),
  (externals.push(null) - 1) as any
);

/**
 * Mark a slot to export a dependency.
 * Use in `hydrate` mode.
 */
export const markExported = <T>(): ExportedDependency<T> =>
  (externals.push(null) - 1) as any;

/**
 * Get the value of an exported dependency.
 * @param idx
 */
export const getDependency = <T>(idx: ExportedDependency<T>): T =>
  externals[idx];

/**
 * Inject an external dependency.
 */
export const injectExternal = <T>(val: T): Value<T> =>
  ('$[' + (externals.push(val) - 1) + ']') as any;

/**
 * Evaluate to statements instead of a function.
 * Use in `default` and `build` mode.
 *
 * @example
 * hydratedCode += `
 *   import { externals as $ } from 'runtime-compiler';
 *   ${evaluateToStatements()}
 * `;
 */
export const evaluateToStatements = (): string =>
  localDeps.length === 0
    ? (exportDeps + ';' as any)
    : (('{let ' + localDeps.slice(1) + exportDeps + '}') as any);

/**
 * Run evaluated code.
 * Use in `default` mode.
 */
export const evaluate = (): any => {
  // @ts-ignore
  globalThis.__runtime_compiler__ = externals;
  (0, eval)('{let $=__runtime_compiler__' + localDeps + exportDeps + '}');
  // @ts-ignore
  delete globalThis.__runtime_compiler__;
}
