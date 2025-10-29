/**
 * False when in `default` and `build` mode, true in `hydrate` mode
 */
export let isHydrating = false;
/**
 * False when in `default` and `hydrate` mode, true in `build` mode
 */
export let onlyBuild = false;

/**
 * @internal
 */
export const hydrating = (): void => {
  isHydrating = true;
};

/**
 * @internal
 */
export const building = (): void => {
  onlyBuild = true;
};
