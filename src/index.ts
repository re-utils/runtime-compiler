import { isHydrating } from "./config/index.ts";

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
 * Use in `default` and `build` mode.
 */
export const declareLocal:
  | (<T>(scope: Scope, expr: Expression<T>) => Identifier<T>)
  | ((scope: Scope, expr: string) => string) = (scope: Scope, expr: string) => (
  (scope[0] += 'let d' + scope[1] + '=' + expr + ';'), 'd' + scope[1]++
);

/**
 * Export a local expression to a parent local variable.
 * Use in `default` and `build` mode.
 *
 * @example
 * // Fork scope
 * const childScope = ['', parentScope.id];
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
 * Mark current available variable id to be already in use.
 * Use in `hydrate` mode.
 * @param scope
 */
export const markDeclared = (scope: Scope): void => {
  scope[1]++;
}

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
 * Export a local expression.
 * Use in `default` and `build` mode.
 */
export const exportExpr:
  | (<T>(value: Expression<T>) => ExportedDependency<T>)
  | (<T>(value: string) => ExportedDependency<T>) = (
  value: string,
) => (
  (statements += '$[' + $.length + ']=' + value + ';'),
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
export const getDependency: <T>(idx: ExportedDependency<T>) => T = isHydrating
  ? ((idx) => $[idx])
  : ((idx) => {
    if (statements.length > 0) {
      // @ts-ignore
      globalThis.__rt_externals__ = $;
      (0, eval)('{let $=__rt_externals__;' + statements + '}');

      // @ts-ignore
      globalThis.__rt_externals__ = null;
      statements = '';
    }

    return $[idx];
  });

/**
 * Get built statements and reset for next build.
 */
export const getStatements = (): string => {
  const s = statements;
  statements = '';
  return s;
}

/**
 * Inject an external dependency.
 */
export const injectExternal: <T>(val: T) => Value<T> = isHydrating
  ? ((val) => ($.push(val), '' as any))
  : ((val) => ('$[' + ($.push(val) - 1) + ']') as any);
