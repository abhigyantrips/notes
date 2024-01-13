import * as React from 'react';

import { Block, CalloutBlock, PageBlock } from '@/types';

import { cn, getTextContent } from '@/lib/utils';

const isIconBlock = (block: Block): block is PageBlock | CalloutBlock => {
  return block.type === 'page' || block.type === 'callout';
};

interface AssetProps {
  block: Block;
  mapImageUrl: (image: string, block: Block) => string;
  big?: boolean;
  className?: string;
}

export default function PageIcon({
  block,
  className,
  big,
  mapImageUrl,
}: AssetProps) {
  if (!isIconBlock(block)) {
    return null;
  }
  const icon = block.format?.page_icon;
  const title = block.properties?.title;

  if (icon?.includes('http')) {
    const url = mapImageUrl(icon, block);

    return (
      <img
        className={cn(
          className,
          big
            ? 'm-2 h-32 w-32 rounded-md'
            : 'block h-5 w-5 rounded-md object-cover'
        )}
        src={url}
        alt={title ? getTextContent(title) : 'Icon'}
      />
    );
  } else {
    return (
      <span
        className={cn(
          className,
          'font-sans',
          big ? 'ml-0 inline-block h-20 w-20 text-3xl' : 'mx-1 leading-6'
        )}
        role="img"
        aria-label={icon}
      >
        {icon}
      </span>
    );
  }
}
