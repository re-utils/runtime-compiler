import evaluate from 'runtime-compiler';

import { hook, route } from '@mapl/framework';
import { compile, ids } from '@mapl/framework/wintertc';

const router = route.group(
  [
    hook.error((e) => {
      console.error(e);
      return new Response('error', { status: 500 });
    }),
  ],
  route.get('/:id', (params) => new Response(params.id)),
  route.get('*', (req) => new Response(req.url), ids.request),
);

export default {
  fetch: evaluate(compile(router))(router),
};
