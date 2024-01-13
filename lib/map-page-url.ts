import { ExtendedRecordMap, Site } from '@/types';

import { getCanonicalPageId } from '@/lib/get-canonical-page-id';
import { parsePageId, uuidToId } from '@/lib/utils';

export function mapPageUrl(
  site: Site,
  recordMap: ExtendedRecordMap,
  pageId: string = ''
) {
  const pageUuid = parsePageId(pageId, { uuid: true });

  if (uuidToId(pageId) === site.rootNotionPageId) {
    return `/`;
  } else {
    return `${getCanonicalPageId(pageUuid, recordMap, {
      uuid: false,
    })}`;
  }
}
