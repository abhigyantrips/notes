import { Github, Instagram, Linkedin } from 'lucide-react';

import Link from 'next/link';

import { siteConfig } from '@/site.config';

import { buttonVariants } from '@/components/ui/button';

export default function IconList() {
  return (
    <>
      {siteConfig.mediaLinks.instagram && (
        <Link
          href={siteConfig.mediaLinks.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </div>
        </Link>
      )}
      {siteConfig.mediaLinks.linkedin && (
        <Link
          href={siteConfig.mediaLinks.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Linkedin className="h-5 w-5 fill-current" />
            <span className="sr-only">LinkedIn</span>
          </div>
        </Link>
      )}
      {siteConfig.mediaLinks.github && (
        <Link
          href={siteConfig.mediaLinks.github}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
            })}
          >
            <Github className="h-5 w-5 fill-current" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
      )}
    </>
  );
}
