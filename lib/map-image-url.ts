import { Block } from '@/types';
import { defaultMapImageUrl } from 'react-notion-x';

import { siteConfig } from '@/site.config';

export function mapImageUrl(url: string, block: Block): string | null {
  if (
    url === siteConfig.defaultPageCover ||
    url === siteConfig.defaultPageIcon
  ) {
    return url;
  }

  return defaultMapImageUrl(url, block);
}
