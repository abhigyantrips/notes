import { NotionAPI } from 'notion-client';
import pMap from 'p-map';
import pMemoize from 'p-memoize';

import { siteConfig } from '@/site.config';
import { ExtendedRecordMap, SiteMap } from '@/types';

import { getCanonicalPageId } from '@/lib/get-canonical-page-id';
import { site } from '@/lib/site';
import { getAllPagesInSpace, mergeRecordMaps, uuidToId } from '@/lib/utils';

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL,
});

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

  return recordMap;
}

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId?: string
): Promise<Partial<SiteMap>> {
  const getPage = async (pageId: string, ...args: any[]) => {
    console.log('\nnotion getPage', uuidToId(pageId));
    return notion.getPage(pageId, ...args);
  };

  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage
  );

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId];
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`);
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid: false,
      });

      if (map[canonicalPageId as keyof typeof map]) {
        console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId as keyof typeof map],
        });

        return map;
      } else {
        return {
          ...map,
          [canonicalPageId as keyof typeof map]: pageId,
        };
      }
    },
    {}
  );

  return {
    pageMap,
    canonicalPageMap,
  };
}

export async function getSiteMap(): Promise<SiteMap> {
  const partialSiteMap = await getAllPages(
    siteConfig.rootNotionPageId,
    siteConfig.rootNotionSpaceId
  );

  return {
    site: site,
    ...partialSiteMap,
  } as SiteMap;
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args),
});
