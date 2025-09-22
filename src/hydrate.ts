import { clearHydration, compiledDependencies, externalDependencies, persistentDependencies } from './index.ts';

export const hydrate = (): any[] => {
  const arr = [compiledDependencies].concat(externalDependencies, persistentDependencies);
  clearHydration();
  return arr;
};
