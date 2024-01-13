'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/site.config';

import { cn } from '@/lib/utils';

import ThemeToggle from '@/components/theme-toggle';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky inset-0 top-0 z-50 flex h-16 w-full flex-col items-center justify-around border-b bg-background/60 px-6 py-0 backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="container relative flex w-full flex-1 items-center">
        <div className="">
          {
            // mobile nav
          }
        </div>
        <div className="flex w-full items-center gap-6">
          <div className="flex flex-initial flex-row items-center justify-start gap-1 p-0">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://abhigyantrips.dev"
              aria-label="Abhigyan Trips"
              title="Abhigyan Trips"
              className="transition-all duration-150 ease-in-out hover:scale-95 hover:contrast-75 hover:grayscale"
            >
              <Image
                src="/page-icon.png"
                alt="Page Icon"
                height={33}
                width={33}
              />
            </Link>
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
