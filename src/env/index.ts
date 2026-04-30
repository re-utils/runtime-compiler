export let IS_JIT = true;
export let IS_BUILD = false;
export let IS_AOT = false;

/**
 * @internal
 */
export const setBuild = (): void => {
  IS_JIT = false;
  IS_BUILD = true;
  IS_AOT = false;
};

/**
 * @internal
 */
export const setAOT = (): void => {
  IS_JIT = false;
  IS_BUILD = false;
  IS_AOT = true;
};
