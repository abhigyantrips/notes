import type { NavigationLink } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  rootNotionPageId: 'b9936d9c94d5432d907e2452703e3612',
  name: "Abhigyan's Notes",
  domain: 'notes.abhigyantrips.dev',
  author: 'Abhigyan Trips',
  description: "A Notion space for all of Abhigyan's notes.",

  twitter: 'AbhigyanTrips',
  github: 'abhigyantrips',
  linkedin: 'abhigyantrips',

  defaultPageIcon: 'https://www.abhigyantrips.dev/assets/profile.png',
  defaultPageCover: 'https://www.abhigyantrips.dev/assets/header.png',
  defaultPageCoverPosition: 0.5,

  isPreviewImageSupportEnabled: true,
  isRedisEnabled: true,

  navigationLinks: [
    {
      title: 'About',
      pageId: '4a02e40d758344fdb4b683a313770caa',
      url: '/about',
    },
    {
      title: 'Contact',
      pageId: 'b7be311856624cc9b50ce3d75adf5b86',
      url: '/contact',
    },
  ] as NavigationLink[],
};
