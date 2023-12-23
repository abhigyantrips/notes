import * as types from '@/types';
import { getAllPagesInSpace, uuidToId } from 'notion-utils';
import pMemoize from 'p-memoize';

import { site } from '@/lib/site';

import { getCanonicalPageId } from './get-canonical-page-id';
import { notion } from './notion-api';

export async function getSiteMap(): Promise<types.SiteMap> {
  const partialSiteMap = await getAllPages(site.rootNotionPageId);

  return {
    site: site,
    ...partialSiteMap,
  } as types.SiteMap;
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args),
});

async function getAllPagesImpl(
  rootNotionPageId: string
): Promise<Partial<types.SiteMap>> {
  const getPage = async (pageId: string, ...args) => {
    console.log('\nnotion getPage', uuidToId(pageId));
    return notion.getPage(pageId, ...args);
  };

  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    undefined,
    getPage
  );

  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map, pageId: string) => {
      const recordMap = pageMap[pageId];
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`);
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap);

      if (map[canonicalPageId! as keyof typeof map]) {
        console.warn('error duplicate canonical page id', {
          canonicalPageId,
          pageId,
          existingPageId: map[canonicalPageId! as keyof typeof map],
        });

        return map;
      } else {
        return {
          ...map,
          [canonicalPageId! as keyof typeof map]: pageId,
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
