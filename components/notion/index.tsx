import { PageProps } from '@/types';

import NotFound from '@/app/not-found';

import { NotionRenderer } from './renderer';

export function Notion({ site, recordMap, error, pageId }: PageProps) {
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;

  if (error || !site || !block) {
    console.log(error);
    return <NotFound />;
  }

  if (typeof window !== 'undefined') {
    const g = window as any;
    g.pageId = pageId;
    g.recordMap = recordMap;
    g.block = block;
  }

  return <NotionRenderer recordMap={recordMap} />;
}
