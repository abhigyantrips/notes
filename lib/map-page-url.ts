import { Site } from '@/types';
import { ExtendedRecordMap } from 'notion-types';
import { parsePageId, uuidToId } from 'notion-utils';

import { getCanonicalPageId } from '@/lib/get-canonical-page-id';

export const mapPageUrl =
  (site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true });

    if (uuidToId(pageUuid) === site.rootNotionPageId) {
      return createUrl('/', searchParams);
    } else {
      return createUrl(
        `/${getCanonicalPageId(pageUuid, recordMap)}`,
        searchParams
      );
    }
  };

export const getCanonicalPageUrl =
  (site: Site, recordMap: ExtendedRecordMap) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true });

    if (uuidToId(pageId) === site.rootNotionPageId) {
      return `https://${site.domain}`;
    } else {
      return `https://${site.domain}/${getCanonicalPageId(
        pageUuid,
        recordMap
      )}`;
    }
  };

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join('?');
}
