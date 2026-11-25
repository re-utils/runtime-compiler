import evaluate from 'runtime-compiler';

export const res = evaluate(Math.random());
export const res1 = evaluate('str');

export const res2 = evaluate({ a: 'b', c: 'd' });
export const res3 = evaluate(new Set(['a', 'b', 'c', 'd']));
export const res4 = evaluate(Function('g', 'return g + 1'));
