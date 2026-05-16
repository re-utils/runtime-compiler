import { summary, run, bench } from 'mitata';

summary(() => {
  bench('Function', () => Function('$', 'return $')(0)).gc('inner');
  bench('eval', () => (0, eval)('$=>$')(0)).gc('inner');
  bench('new Function', () => new Function('$', 'return $')(0)).gc('inner');
});

const AsyncFunction = (async () => 0).constructor as any;

summary(() => {
  bench('new AsyncFunction', () => new AsyncFunction('$', 'return $')(0)).gc('inner');
  bench('AsyncFunction', () => AsyncFunction('$', 'return $')(0)).gc('inner');
  bench('eval', () => (0, eval)('async $=>$')(0)).gc('inner');
});

// Start the benchmark
run();
