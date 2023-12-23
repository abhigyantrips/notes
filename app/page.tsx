import type { PageProps } from '@/types';

import * as React from 'react';

import { siteConfig } from '@/site.config';

import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { site } from '@/lib/site';

import { NotionPage } from '@/components/notion-page';

export async function getPageProps() {
  try {
    const props = await resolveNotionPage(site.domain);

    return props;
  } catch (err) {
    console.error('page error', site.domain, err);

    throw err;
  }
}

export default async function NotionDomainPage() {
  const props = await getPageProps();

  return <NotionPage {...props} />;
}
