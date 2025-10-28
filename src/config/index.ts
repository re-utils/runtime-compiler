/**
 * False when in `default` and `build` mode, true in `hydrate` mode
 */
export let isHydrating = false;
/**
 * False when in `default` and `hydrate` mode, true in `build` mode
 */
export let isOnlyBuilding = false;

/**
 * @private
 */
export const hydrating = (): void => {
  isHydrating = true;
};

/**
 * @private
 */
export const building = (): void => {
  isOnlyBuilding = true;
};
