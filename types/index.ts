import { ExtendedRecordMap, PageMap } from 'notion-types';

export * from 'notion-types';

export interface PageError {
  message?: string;
  statusCode: number;
}

export interface PageProps {
  site?: Site;
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
}

export interface Site {
  name: string;
  domain: string;
  rootNotionPageId: string;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;
}

export interface NavigationLink {
  title: string;
  pageId?: string;
  url: string;
}

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}

export interface SiteMap {
  site: Site;
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
}

export interface PageUrlOverridesMap {
  // maps from a URL path to the notion page id the page should be resolved to
  // (this overrides the built-in URL path generation for these pages)
  [pagePath: string]: string;
}
