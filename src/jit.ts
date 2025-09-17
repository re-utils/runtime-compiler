import {
  AsyncFunction,
  clear,
  compiledDependencies,
  evaluateCode,
  externalDependencies,
  externalDependencyNames
} from './index.ts';

export const evaluateToString = (): string => '(' + externalDependencyNames() + ')=>' + evaluateCode();

export const evaluateSync = (): void => {
  Function(externalDependencyNames(), evaluateCode())(
    compiledDependencies,
    ...externalDependencies,
  );
  clear();
};

export const evaluate = async (): Promise<void> => {
  await AsyncFunction(externalDependencyNames(), evaluateCode())(
    compiledDependencies,
    ...externalDependencies,
  );
  clear();
};
