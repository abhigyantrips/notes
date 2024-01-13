import * as React from 'react';

import Image from 'next/image';

import { Block, ExtendedRecordMap } from '@/types';

import { mapImageUrl } from '@/lib/map-image-url';
import { getTextContent } from '@/lib/utils';

const supportedAssetTypes = ['video', 'image', 'embed', 'gist', 'codepen'];

export default function Asset({
  recordMap,
  blockId,
  children,
}: {
  recordMap: ExtendedRecordMap;
  blockId: string;
  children: React.ReactNode;
}) {
  const block = recordMap.block[blockId].value;

  if (!block || !supportedAssetTypes.includes(block.type)) {
    return null;
  }

  const style: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'column',
  };

  const assetStyle: React.CSSProperties = {};

  if (block.format) {
    const {
      block_aspect_ratio,
      block_height,
      block_width,
      block_full_width,
      block_page_width,
      block_preserve_scale,
    } = block.format;

    if (block_full_width || block_page_width) {
      if (block_full_width) {
        style.width = '100vw';
      } else {
        style.width = '100%';
      }

      if (block.type === 'video') {
        if (block_height) {
          style.height = block_height;
        } else if (block_aspect_ratio) {
          style.paddingBottom = `${block_aspect_ratio * 100}%`;
        } else if (block_preserve_scale) {
          style.objectFit = 'contain';
        }
      } else if (block_aspect_ratio && block.type !== 'image') {
        style.paddingBottom = `${block_aspect_ratio * 100}%`;
      } else if (block_height) {
        style.height = block_height;
      } else if (block_preserve_scale) {
        if (block.type === 'image') {
          style.height = '100%';
        } else {
          // TODO: this is just a guess
          style.paddingBottom = '75%';
          style.minHeight = 100;
        }
      }
    } else {
      switch (block.format?.block_alignment) {
        case 'center': {
          style.alignSelf = 'center';
          break;
        }
        case 'left': {
          style.alignSelf = 'start';
          break;
        }
        case 'right': {
          style.alignSelf = 'end';
          break;
        }
      }

      if (block_width) {
        style.width = block_width;
      }

      if (block_preserve_scale && block.type !== 'image') {
        style.paddingBottom = '50%';
        style.minHeight = 100;
      } else {
        if (block_height && block.type !== 'image') {
          style.height = block_height;
        }
      }
    }

    if (block.type === 'image') {
      assetStyle.objectFit = 'cover';
    } else if (block_preserve_scale) {
      assetStyle.objectFit = 'contain';
    }
  }

  let source =
    recordMap.signed_urls?.[block.id] || block.properties?.source?.[0]?.[0];
  let content = null;

  if (!source) {
    return null;
  }

  if (
    block.type === 'embed' ||
    block.type === 'video' ||
    block.type === 'gist' ||
    block.type === 'codepen'
  ) {
    let src = block.format?.display_source || source;

    if (src) {
      if (block.type === 'gist') {
        if (!src.endsWith('.pibb')) {
          src = `${src}.pibb`;
        }

        assetStyle.width = '100%';
        style.paddingBottom = '50%';

        // TODO: GitHub gists do not resize their height properly
        content = (
          <iframe
            style={assetStyle}
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-md"
            src={src}
            title="GitHub Gist"
            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
            loading="lazy"
          />
        );
      } else {
        content = (
          <iframe
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-md"
            style={assetStyle}
            src={src}
            title={`iframe ${block.type}`}
            allowFullScreen
            loading="lazy"
          />
        );
      }
    }
  } else if (block.type === 'image') {
    if (source.includes('file.notion.so')) {
      source = block.properties?.source?.[0]?.[0];
    }
    const src = mapImageUrl(source, block) || '';
    const caption = getTextContent(block.properties?.caption);
    const alt = caption || 'notion image';

    content = (
      <Image
        src={src}
        alt={alt}
        height={style.height as number}
        style={assetStyle}
        fill
        objectFit={block.type === 'image' ? 'cover' : 'contain'}
      />
    );
  }

  return (
    <>
      <div style={style}>
        {content}
        {block.type === 'image' && children}
      </div>

      {block.type !== 'image' && children}
    </>
  );
}
