import { Suspense } from 'react';

import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { site } from '@/lib/site';

import { Notion } from '@/components/notion';

import Loading from '@/app/loading';

export const revalidate = 60;

export async function getPageProps() {
  try {
    const props = await resolveNotionPage(site.domain);

    return props;
  } catch (err) {
    console.error('page error', site.domain, err);

    throw err;
  }
}

export default async function NotesPage() {
  const props = await getPageProps();
  console.log(props);
  return (
    <Suspense fallback={<Loading />}>
      <Notion {...props} />
    </Suspense>
  );
}
