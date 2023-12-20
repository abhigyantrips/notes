'use client';

import { siteConfig } from '@/site.config';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

export default function Header() {
  const navigationLinks = siteConfig.navigationLinks;
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full flex-col items-center justify-around bg-opacity-80 px-6 py-0 backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="relative flex w-full flex-1 items-center">
        <div className="">
          {
            // mobile nav
          }
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="flex flex-initial flex-row items-center justify-start gap-1 p-0">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://abhigyantrips.dev"
              aria-label="Abhigyan Trips"
              title="Abhigyan Trips"
            >
              <svg
                aria-label="Vercel logomark"
                height="22"
                role="img"
                className="w-auto overflow-visible"
                viewBox="0 0 74 64"
              >
                <path
                  d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
                  fill="#fff"
                ></path>
              </svg>
            </a>
            <svg height="32" role="separator" viewBox="0 0 32 32" width="32">
              <path
                d="M22 5L9 28"
                className="stroke-foreground/50"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <a
              aria-label="Go to Home"
              title="Go to Home"
              className="flex touch-none"
              href="/"
            >
              <span className="text-2xl font-bold text-foreground transition-colors duration-150 ease-in-out hover:text-foreground/60">
                Notes.
              </span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {siteConfig.navigationLinks &&
            siteConfig.navigationLinks.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className={cn(
                  'mr-3 text-sm transition-colors duration-150 ease-in-out hover:text-foreground/80',
                  pathname === item.url
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {item.title}
              </Link>
            ))}
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Icons.instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
