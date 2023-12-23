import { siteConfig } from '@/site.config';

import IconList from '@/components/icon-list';

export default function Footer() {
  return (
    <footer className="flex h-16 w-full border-t px-6 py-0">
      <div className="container flex w-full flex-1 flex-col items-center justify-between md:flex-row">
        <div className="py-3 text-center text-sm text-muted-foreground">
          <span>
            {siteConfig.author} &copy; {new Date().getFullYear()}.{' '}
          </span>
          <br className="md:hidden" />
          <span>All rights reserved.</span>
        </div>
        <div className="py-3">
          <IconList />
        </div>
      </div>
    </footer>
  );
}
