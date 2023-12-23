import { PageProps } from '@/types';

import * as React from 'react';

import { getSiteMap } from '@/lib/get-site-map';
import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { site } from '@/lib/site';

import { NotionPage } from '@/components/notion-page';

export async function getStaticProps(context: {
  params?: {
    pageId: string;
  };
}) {
  const rawPageId = context.params!.pageId as string;

  try {
    const props = await resolveNotionPage(site.domain, rawPageId);

    return { props, revalidate: 60 };
  } catch (err) {
    console.error('page error', site.domain, rawPageId, err);

    throw err;
  }
}

export async function getStaticPaths() {
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [],
      fallback: true,
    };
  }

  const siteMap = await getSiteMap();

  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId,
      },
    })),
    // paths: [],
    fallback: true,
  };

  console.log(staticPaths.paths);
  return staticPaths;
}

export default function NotionDynamicPage(props: PageProps) {
  return <NotionPage {...props} />;
}
