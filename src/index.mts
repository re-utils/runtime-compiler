/**
 * Serialize the value at build time and replace the call with the serialized value at runtime.
 * @example
 * // input source file
 * import evaluate from 'runtime-compiler';
 *
 * const fib = (i: number): number => (i < 2 ? i : fib(i - 1) + fib(i - 2));
 * export default evaluate(fib(12));
 *
 * // compiled & minified to
 * var e=144;export{e as default};
 */
const evaluate = <T,>(v: T): T => v;
export default evaluate;
