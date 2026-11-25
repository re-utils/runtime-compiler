import evaluate from 'runtime-compiler';

const fib = (i) => (i < 2 ? i : fib(i - 1) + fib(i - 2));
export default evaluate(fib(12));
