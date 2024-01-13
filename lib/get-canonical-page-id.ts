import { siteConfig } from '@/site.config';
import { ExtendedRecordMap } from '@/types';

import {
  getCanonicalPageId as getCanonicalPageIdImpl,
  parsePageId,
} from '@/lib/utils';

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false });
  if (!cleanPageId) {
    return null;
  }
  const override = siteConfig.navigationLinks?.find((link) => {
    return link.pageId === cleanPageId;
  });
  if (override) {
    return override.url;
  } else {
    return `/${getCanonicalPageIdImpl(pageId, recordMap, {
      uuid,
    })}`;
  }
}
