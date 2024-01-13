import * as React from 'react';

import Link from 'next/link';

import { ExtendedRecordMap } from '@/types';

import { mapPageUrl } from '@/lib/map-page-url';
import { site } from '@/lib/site';
import { cn, parsePageId } from '@/lib/utils';

import Asset from '@/components/notion/asset';
import { createRenderChildText } from '@/components/notion/block';

const urlStyle = { width: '100%' };

export default function AssetWrapper({
  recordMap,
  blockId,
}: {
  recordMap: ExtendedRecordMap;
  blockId: string;
}) {
  const block = recordMap.block[blockId]?.value;
  const renderChildText = createRenderChildText();

  let isURL = false;
  if (block.type === 'image') {
    const caption: string = block?.properties?.caption?.[0]?.[0] || '';
    if (caption) {
      const id = parsePageId(caption, { uuid: true });

      const isPage = caption.charAt(0) === '/' && id;
      if (isPage || isValidURL(caption)) {
        isURL = true;
      }
    }
  }

  const figure = (
    <figure
      className={cn(
        'mx-0 my-2 flex w-full max-w-full flex-col self-center [&>iframe]:border-none [&>iframe]:bg-inherit',
        block.type === 'image' && 'h-full max-h-full',
        blockId
      )}
    >
      <Asset recordMap={recordMap} blockId={blockId}>
        {block?.properties?.caption && !isURL && (
          <figcaption className="whitespace-pre-wrap break-words px-0 py-2 text-sm leading-6 text-foreground/80">
            {renderChildText(block.properties.caption)}
          </figcaption>
        )}
      </Asset>
    </figure>
  );

  // allows for an image to be a link
  if (isURL) {
    const caption: string = block?.properties?.caption?.[0]?.[0] || '';
    const id = parsePageId(caption, { uuid: true });
    const isPage = caption.charAt(0) === '/' && id;
    const captionHostname = extractHostname(caption);

    return (
      <Link
        style={urlStyle}
        href={isPage ? mapPageUrl(site, recordMap, id) : caption}
        target={
          captionHostname &&
          captionHostname !== site.domain &&
          !caption.startsWith('/')
            ? 'blank_'
            : ''
        }
      >
        {figure}
      </Link>
    );
  }

  return figure;
}

function isValidURL(str: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(str);
}

function extractHostname(url: string) {
  try {
    const hostname = new URL(url).hostname;
    return hostname;
  } catch (err) {
    return '';
  }
}
