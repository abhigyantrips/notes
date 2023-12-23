import { ExtendedRecordMap } from '@/types';
import { mergeRecordMaps } from 'notion-utils';
import pMap from 'p-map';
import pMemoize from 'p-memoize';

import { siteConfig } from '@/site.config';

import { notion } from './notion-api';
import { getPreviewImageMap } from './preview-images';

const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = (siteConfig.navigationLinks || [])
      .map((link) => link.pageId)
      .filter(Boolean);

    if (navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          notion.getPage(navigationLinkPageId!, {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false,
          }),
        {
          concurrency: 4,
        }
      );
    }

    return [];
  }
);

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notion.getPage(pageId);
  const navigationLinkRecordMaps = await getNavigationLinkPages();

  if (navigationLinkRecordMaps?.length) {
    recordMap = navigationLinkRecordMaps.reduce(
      (map, navigationLinkRecordMap) =>
        mergeRecordMaps(map, navigationLinkRecordMap),
      recordMap
    );
  }

  const previewImageMap = await getPreviewImageMap(recordMap);
  (recordMap as any).preview_images = previewImageMap;

  return recordMap;
}
