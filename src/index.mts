/**
 * @internal
 */
export let __rtcpl_content__: [lineIdx: number, posIdx: number, serializedValue: string][] = [];

/**
 * Serialize the value at build time and replace the call with the serialized value at runtime.
 * @example
 * // input source file
 * import precompile from 'runtime-compiler';
 *
 * const fib = (i: number): number => (i < 2 ? i : fib(i - 1) + fib(i - 2));
 * export default precompile(fib(12));
 *
 * // compiled & minified to
 * var e=144;export{e as default};
 */
const evaluate = <T,>(value: T, serializer?: (v: T) => string): T => {
  const match = /:([0-9]+):([0-9]+)/.exec(new Error().stack!.split('\n', 3)[2])!;
  __rtcpl_content__.push([+match[1] - 1, +match[2] - 1, serializer?.(value) ?? '' + value]);
  return value;
};
export default evaluate;
