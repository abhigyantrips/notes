import { ExtendedRecordMap } from '@/types';
import { parsePageId } from 'notion-utils';

import { siteConfig } from '@/site.config';

import * as acl from './acl';
import { db } from './db';
import { getSiteMap } from './get-site-map';
import { getPage } from './notion';
import { site } from './site';

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let pageId: string;
  let recordMap: ExtendedRecordMap;

  if (rawPageId && rawPageId !== 'index') {
    pageId = parsePageId(rawPageId);

    if (!pageId) {
      const override = siteConfig.navigationLinks?.find((link) => {
        return link.pageId == rawPageId;
      });

      if (override) {
        pageId = parsePageId(override.pageId);
      }
    }

    const useUriToPageIdCache = true;
    const cacheKey = `uri-to-page-id:${domain}:${
      process.env.NODE_ENV || 'development'
    }:${rawPageId}`;
    const cacheTTL = undefined; // disable cache TTL

    if (!pageId && useUriToPageIdCache) {
      try {
        // check if the database has a cached mapping of this URI to page ID
        pageId = await db.get(cacheKey);

        // console.log(`redis get "${cacheKey}"`, pageId)
      } catch (err: any) {
        // ignore redis errors
        console.warn(`redis error get "${cacheKey}"`, err.message);
      }
    }

    if (pageId) {
      recordMap = await getPage(pageId);
    } else {
      // handle mapping of user-friendly canonical page paths to Notion page IDs
      // e.g., /developer-x-entrepreneur versus /71201624b204481f862630ea25ce62fe
      const siteMap = await getSiteMap();
      pageId = siteMap?.canonicalPageMap[rawPageId];

      if (pageId) {
        // TODO: we're not re-using the page recordMap from siteMaps because it is
        // cached aggressively
        // recordMap = siteMap.pageMap[pageId]

        recordMap = await getPage(pageId);

        if (useUriToPageIdCache) {
          try {
            // update the database mapping of URI to pageId
            await db.set(cacheKey, pageId, cacheTTL);

            // console.log(`redis set "${cacheKey}"`, pageId, { cacheTTL })
          } catch (err: any) {
            // ignore redis errors
            console.warn(`redis error set "${cacheKey}"`, err.message);
          }
        }
      } else {
        // note: we're purposefully not caching URI to pageId mappings for 404s
        return {
          error: {
            message: `Not found "${rawPageId}"`,
            statusCode: 404,
          },
        };
      }
    }
  } else {
    pageId = site.rootNotionPageId;

    console.log(site);
    recordMap = await getPage(pageId);
  }

  const props = { site, recordMap, pageId };
  return { ...props, ...(await acl.pageAcl(props)) };
}
