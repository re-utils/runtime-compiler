import evaluate from 'runtime-compiler';

// loop
export let res = 0;
for (let i = 0; i < 5; i++) res += evaluate(i);

// nested closures
export let res1 = evaluate(
  (
    (a) => () =>
      a
  )(Math.random()),
);

// nested callee
const fn1 = (a) => evaluate(a);
export let res2 = fn1(Math.random()),
  res3 = fn1('str');
