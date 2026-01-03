export type Scope = [nextId: number];

export const init = (): Scope => [0];
export const declareNextId = (scope: Scope): string => 'let l' + scope[0]++;
export const idCount = (scope: Scope): number => scope[0];
