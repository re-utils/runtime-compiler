export let isHydrating = false;

/**
 * @private
 */
export const hydrating = (): void => {
  isHydrating = true;
};
