import { Block } from '@/types';
import { defaultMapImageUrl } from 'react-notion-x';

import { siteConfig } from '@/site.config';

export const mapImageUrl = (url: string, block: Block) => {
  if (
    url === siteConfig.defaultPageCover ||
    url === siteConfig.defaultPageIcon
  ) {
    return url;
  }

  return defaultMapImageUrl(url, block);
};
