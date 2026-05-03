import { createUnplugin, type HookFilter, type UnpluginInstance } from 'unplugin';
import rolldown from './rolldown.ts';

export default createUnplugin(rolldown as any) as UnpluginInstance<
  {
    filter: HookFilter;
  },
  any
>;
