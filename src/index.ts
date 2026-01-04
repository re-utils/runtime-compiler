declare const _01: unique symbol;
export type Statements = string & {
  [_01]: 0;
};

declare const _02: unique symbol;
export type Statement = Statements & {
  [_02]: 0
}

declare const _: unique symbol;
export type Expression<T> = Statement & {
  [_]: T;
};

declare const _11: unique symbol;
export type Identifier<T> = Expression<T> & {
  [_11]: 0;
};

declare const _20: unique symbol;
export type ExportedDependency<T> = number & {
  [_20]: 0;
};

export type InferExpression<T extends { [_]: any }> = T[typeof _];

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
export let localDeps = '';
let localDepsCnt = 0;

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
  name: Expression<T>,
): ExportedDependency<T> => (
  (exportedDeps += name + ','), exportedDepsCnt++ as any
);

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
 * @internal
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
export const injectExternalDependency = <T>(val: T): Identifier<T> =>
  ('_' + externalDependencies.push(val)) as any;

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
 * Equivalent to calling `evaluate`/`evaluateSync` in `default` or `build` mode.
 * Return the args that needs to be passed in.
 * Use in `hydrate` mode.
 *
 * @example
 * (() => {
 *   // Built content
 * })(finishHydration())
 */
export const hydrate = (): any[] =>
  [compiledDependencies].concat(externalDependencies);

/**
 * Get evaluated code.
 * Use in `default` and `build` mode.
 */
export const evaluateCode = (): Statements =>
  ('var $' +
    localDeps +
    ';_.push(' +
    exportedDeps +
    ');' +
    extraCode) as any;

/**
 * Evaluate code to string.
 * Use in `default` and `build` mode.
 */
export const evaluateToString = (): Expression<(...args: any[]) => any> =>
  ('(' + externalDependencyNames() + ')=>{' + evaluateCode() + '}') as any;

/**
 * Run evaluated code.
 * Use in `default` and `build` mode.
 */
export const evaluate = (): any => {
  try {
    return Function(externalDependencyNames(), evaluateCode())(
      compiledDependencies,
      ...externalDependencies,
    );
  } finally {
    localDeps = '';
    localDepsCnt = 0;

    exportedDeps = '';

    extraCode = '';
  }
};
