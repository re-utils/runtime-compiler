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

export type Scope = [
  body: string,
  /**
   * Next available id.
   */
  id: number,
];

/**
 * Declare a variable in the current scope.
 */
export const declareLocal:
  | (<T>(scope: Scope, expr: Expression<T>) => Identifier<T>)
  | ((scope: Scope, expr: string) => string) = (scope: Scope, expr: string) => (
  (scope[0] += 'let d' + scope[1] + '=' + expr + ';'), 'd' + scope[1]++
);

/**
 * Export a local expression to a parent local variable
 *
 * @example
 * // Fork scope
 * const childScope = {
 *   body: '',
 *   id: parentScope.id
 * };
 * // let d0;{let d1=1;d0=d1}
 * const id = exportLocal(childScope, declareLocal(childScope, '1'), parentScope); // d0
 */
export const exportLocal:
  | (<T>(
      scope: Scope,
      expr: Expression<T>,
      parentScope: Scope,
    ) => Identifier<T>)
  | ((scope: Scope, expr: string, parentScope: Scope) => string) = (
  scope: Scope,
  expr: string,
  parentScope: Scope,
) => {
  const currentId = 'd' + parentScope[1]++;
  parentScope[0] +=
    'let ' + currentId + ';{' + scope[0] + currentId + '=' + expr + '}';
  return currentId;
};

/**
 * External dependencies
 */
export const $: any[] = [];

export let statements = '';

/**
 * Export a local dependency of a scope.
 * Use in `default` and `build` mode.
 */
export const exportScope:
  | (<T>(scope: Scope, value: Expression<T>) => ExportedDependency<T>)
  | (<T>(scope: Scope, value: string) => ExportedDependency<T>) = (
  scope: Scope,
  value: string,
) => (
  (statements += '{' + scope[0] + '$[' + $.length + ']=' + value + '}'),
  $.length++ as any
);

/**
 * Mark a slot to export a dependency.
 * Use in `hydrate` mode.
 */
export const markExported = <T>(): ExportedDependency<T> => $.length++ as any;

/**
 * Get the value of an exported dependency.
 * @param idx
 */
export const getDependency = <T>(idx: ExportedDependency<T>): T => $[idx];

/**
 * Inject an external dependency.
 */
export const injectExternal = <T>(val: T): Value<T> =>
  ('$[' + ($.push(val) - 1) + ']') as any;

/**
 * Run evaluated code.
 * Use in `default` mode.
 */
export const evaluate = (): void => {
  // @ts-ignore
  globalThis.__rt_externals__ = $;
  (0, eval)('{let $=__rt_externals__;' + statements + '}');

  // @ts-ignore
  globalThis.__rt_externals__ = null;
  statements = '';
};
