import {
  clearHydration,
  compiledDependencies,
  externalDependencies,
} from './index.ts';

export const hydrate = (): any[] => {
  const arr = [compiledDependencies].concat(externalDependencies);
  clearHydration();
  return arr;
};
