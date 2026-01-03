export type Scope = [nextId: number];

export const init = (): Scope => [0];
export const nextId = (scope: Scope): string => 'l' + scope[0]++;
export const idCount = (scope: Scope): number => scope[0];
