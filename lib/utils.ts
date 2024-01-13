import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Block, BlockMap } from '@/types';

export * from 'notion-utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function groupBlockContent(blockMap: BlockMap): string[][] {
  const output: string[][] = [];

  let lastType: string | undefined = undefined;
  let index = -1;

  Object.keys(blockMap).forEach((id) => {
    blockMap[id].value.content?.forEach((blockId) => {
      const blockType = blockMap[blockId]?.value?.type;

      if (blockType && blockType !== lastType) {
        index++;
        lastType = blockType;
        output[index] = [];
      }

      output[index].push(blockId);
    });

    lastType = undefined;
  });

  return output;
}

export function getListNumber(blockId: string, blockMap: BlockMap) {
  const groups = groupBlockContent(blockMap);
  const group = groups.find((g) => g.includes(blockId));

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
}

export function defaultMapImageUrl(image = '', block: Block) {
  const url = new URL(
    `https://www.notion.so${
      image.startsWith('/image') ? image : `/image/${encodeURIComponent(image)}`
    }`
  );

  if (block && !image.includes('/images/page-cover/')) {
    const table = block.parent_table === 'space' ? 'block' : block.parent_table;
    url.searchParams.set('table', table);
    url.searchParams.set('id', block.id);
    url.searchParams.set('cache', 'v2');
  }

  return url.toString();
}

export function defaultMapPageUrl(pageId: string = '') {
  pageId = pageId.replace(/-/g, '');

  return `/${pageId}`;
}
