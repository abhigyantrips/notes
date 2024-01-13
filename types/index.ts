import {
  BaseBlock,
  BlockMap,
  BlockType,
  ExtendedRecordMap,
  PageMap,
  SubDecoration,
} from 'notion-types';

export * from 'notion-types';

export interface PageProps {
  site?: Site;
  recordMap?: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
}

export interface PageError {
  message?: string;
  statusCode: number;
}

export interface Site {
  name: string;
  domain: string;
  rootNotionPageId: string;
  rootNotionSpaceId: string | undefined;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;
}

export interface SiteMap {
  site: Site;
  pageMap: PageMap;
  canonicalPageMap: CanonicalPageMap;
}

export interface NavigationLink {
  title: string;
  pageId?: string;
  url: string;
}

export interface CanonicalPageMap {
  [canonicalPageId: string]: string;
}

export interface CustomBlockComponentProps<T extends BaseBlock['type']> {
  renderComponent: () => JSX.Element | null;
  blockMap: BlockMap;
  blockValue: T extends BaseBlock['type']
    ? Extract<BlockType, { type: T }> extends [never]
      ? BaseBlock
      : Extract<BlockType, { type: T }>
    : BaseBlock;
  level: number;
  children?: React.ReactNode;
}

export type CustomBlockComponents = {
  [K in BaseBlock['type']]?: React.FC<CustomBlockComponentProps<K>>;
};

type SubDecorationSymbol = SubDecoration[0];
type SubDecorationValue<T extends SubDecorationSymbol> = Extract<
  SubDecoration,
  [T, any]
>[1];

export type CustomDecoratorComponentProps<T extends SubDecorationSymbol> =
  (SubDecorationValue<T> extends never
    ? {}
    : {
        decoratorValue: SubDecorationValue<T>;
      }) & {
    renderComponent: () => JSX.Element | null;
  };

export type CustomDecoratorComponents = {
  [K in SubDecorationSymbol]?: React.FC<CustomDecoratorComponentProps<K>>;
};
