import { siteConfig } from './lib/site-config'

export default siteConfig({
  rootNotionPageId: 'b9936d9c94d5432d907e2452703e3612',
  rootNotionSpaceId: null,

  name: 'Abhigyan\'s Notes',
  domain: 'notes.abhigyantrips.dev',
  author: 'Abhigyan Trips',
  description: 'A Notion space for all of Abhigyan\'s notes.',

  twitter: 'AbhigyanTrips',
  github: 'abhigyantrips',
  linkedin: 'abhigyantrips',

  defaultPageIcon: 'https://www.abhigyantrips.dev/assets/profile.png',
  defaultPageCover: 'https://www.abhigyantrips.dev/assets/header.png',
  defaultPageCoverPosition: 0.5,

  isPreviewImageSupportEnabled: true,
  isRedisEnabled: true,
  includeNotionIdInUrls: false,

  navigationStyle: 'custom',
})
