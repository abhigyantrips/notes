import { siteConfig } from '@/site.config';
import type { Site } from '@/types';

import { parsePageId } from '@/lib/utils';

export const site: Site = {
  domain: siteConfig.domain,
  name: siteConfig.name,
  rootNotionPageId: parsePageId(siteConfig.rootNotionPageId, { uuid: false }),
  rootNotionSpaceId: parsePageId(siteConfig.rootNotionSpaceId, { uuid: true }),
  description: siteConfig.description,
};
