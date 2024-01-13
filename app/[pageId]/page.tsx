import { Suspense } from 'react';

import { PageProps } from '@/types';

import { getSiteMap } from '@/lib/notion';
import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { site } from '@/lib/site';

import { Notion } from '@/components/notion';

import Loading from '@/app/loading';

export const dynamicParams = true;
export const revalidate = 60;

export async function getPageProps(params: { pageId: string }) {
  const rawPageId = params!.pageId;

  try {
    const props = await resolveNotionPage(site.domain, rawPageId);

    return props;
  } catch (err) {
    console.error('page error', site.domain, rawPageId, err);

    throw err;
  }
}

export async function generateStaticParams() {
  const siteMap = await getSiteMap();

  const staticPaths = Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
    pageId,
  }));

  console.log(staticPaths);
  return staticPaths;
}

export default async function NotionDynamicPage({
  params,
}: {
  params: { pageId: string };
}) {
  const props = await getPageProps(params);

  return (
    <Suspense fallback={<Loading />}>
      <Notion {...props} />
    </Suspense>
  );
}
