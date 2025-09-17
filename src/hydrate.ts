import { clear, compiledDependencies, externalDependencies } from './index.ts';

export const hydrate = (): any[] => {
  const arr = [compiledDependencies].concat(externalDependencies);
  clear();
  return arr;
};
