import type { Site } from '@/types';
import { parsePageId } from 'notion-utils';

import { siteConfig } from '@/site.config';

export const site: Site = {
  domain: siteConfig.domain,
  name: siteConfig.name,
  rootNotionPageId: parsePageId(siteConfig.rootNotionPageId, { uuid: false }),
  description: siteConfig.description,
};
