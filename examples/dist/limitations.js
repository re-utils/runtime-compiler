const evaluate = (v) => v;
// src/limitations.mjs
let res = 0;
for (let i = 0; i < 5; i++) res += 0;
let res1 = evaluate(((a) => () => a)(Math.random()));
const fn1 = (a) => evaluate(a);
let res2 = fn1(Math.random());
let res3 = fn1("str");
export { res, res1, res2, res3 };
