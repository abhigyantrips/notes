import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { site } from '@/lib/site';

import { NotionPage } from '@/components/notion-page';

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

export default async function NotionDomainPage() {
  const props = await getPageProps();
  console.log(props);
  return <NotionPage {...props} />;
}
