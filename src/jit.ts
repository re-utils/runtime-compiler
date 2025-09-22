import {
  AsyncFunction,
  clear,
  compiledDependencies,
  evaluateCode,
  externalDependencies,
  externalDependencyNames,
} from './index.ts';

export const evaluateToString = (): string =>
  '(' + externalDependencyNames() + ')=>' + evaluateCode();

export const evaluateSync = (): void => {
  try {
    Function(externalDependencyNames(), evaluateCode())(
      compiledDependencies,
      ...externalDependencies,
    );
  } finally {
    clear();
  }
};

export const evaluate = async (): Promise<void> =>
  AsyncFunction(externalDependencyNames(), evaluateCode())(
    compiledDependencies,
    ...externalDependencies,
  ).finally(clear);
