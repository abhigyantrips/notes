import type { PageProps } from '@/types';

import { siteConfig } from '@/site.config';

import { notion } from '@/lib/notion-api';
import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { site } from '@/lib/site';

import { NotionPage } from '@/components/notion-page';

export async function getPageProps() {
  try {
    const recordMap = notion.getPage(siteConfig.rootNotionPageId);

    return recordMap;
  } catch (err) {
    console.error('page error', site.domain, err);

    throw err;
  }
}

export default async function NotionDomainPage() {
  const recordMap = await getPageProps();
  return <NotionPage recordMap={recordMap} site={site} />;
}
