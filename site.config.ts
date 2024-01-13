import type { NavigationLink } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  rootNotionPageId: '2e22de6b770e4166be301490f6ffd420',
  rootNotionSpaceId: undefined,
  name: "Abhigyan's Notes",
  domain: 'notes.abhigyantrips.dev',
  author: 'Abhigyan Trips',
  description: "A Notion space for all of Abhigyan's notes.",

  defaultPageIcon: 'https://www.abhigyantrips.dev/assets/profile.png',
  defaultPageCover: 'https://www.abhigyantrips.dev/assets/header.png',

  isRedisEnabled: false,

  mediaLinks: {
    instagram: 'https://instagram.com/gyaanibutternaan',
    github: 'https://github.com/abhigyantrips',
    linkedin: 'https://linkedin.com/in/abhigyantrips',
  },

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
