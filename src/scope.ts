export type Scope = [start: string, end: string, nextId: number];

/**
 * Get next available id in a scope.
 */
export const scopeNextId = (scope: Scope): number => scope[2]++;

/**
 * Get scope content.
 */
export const scopeContent = (scope: Scope): string => `{${scope[0] + scope[1]}}`;

/**
 * Fork a new scope.
 */
export const scopeFork = <T extends Scope>(scope: T): T => scope.slice() as any;
