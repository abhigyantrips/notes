import { siteConfig } from '@/site.config';

import IconList from '@/components/icon-list';

export default function Footer() {
  return (
    <footer className="flex h-16 w-full border-t px-6 py-0">
      <div className="container flex w-full flex-1 items-center justify-between">
        <div className="my-4 flex text-sm text-muted-foreground">
          <span>
            {siteConfig.author} &copy; {new Date().getFullYear()}. All rights
            reserved.
          </span>
        </div>
        <div className="flex gap-1">
          <IconList />
        </div>
      </div>
    </footer>
  );
}
