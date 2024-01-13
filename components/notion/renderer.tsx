import React from 'react';

import {
  Block as BlockType,
  CustomBlockComponents,
  CustomDecoratorComponents,
  ExtendedRecordMap,
  Site,
} from '@/types';

import { mapPageUrl as defaultMapPageUrl } from '@/lib/map-page-url';
import { defaultMapImageUrl } from '@/lib/utils';

import { Block } from '@/components/notion/block';

export interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
  mapPageUrl?: (
    site: Site,
    recordMap: ExtendedRecordMap,
    pageId?: string
  ) => string;
  mapImageUrl?: (image: string, block: BlockType) => string;

  currentId?: string;
  level?: number;
  customBlockComponents?: CustomBlockComponents;
  customDecoratorComponents?: CustomDecoratorComponents;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
  currentId,
  mapPageUrl = defaultMapPageUrl,
  mapImageUrl = defaultMapImageUrl,
  ...props
}) => {
  const blockMap = props.recordMap.block!;
  const id = currentId || Object.keys(blockMap)[0];
  const currentBlock = blockMap[id as keyof typeof blockMap];

  if (!currentBlock) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('error rendering block', currentId);
    }
    return null;
  }

  return (
    <Block
      key={id}
      level={level}
      block={currentBlock.value}
      mapPageUrl={mapPageUrl}
      mapImageUrl={mapImageUrl}
      {...props}
    >
      {currentBlock?.value?.content?.map((contentId: string) => (
        <NotionRenderer
          key={contentId}
          currentId={contentId}
          level={level + 1}
          mapPageUrl={mapPageUrl}
          mapImageUrl={mapImageUrl}
          {...props}
        />
      ))}
    </Block>
  );
};
