import * as React from 'react';

import Link from 'next/link';

import {
  Block,
  Site,
  CustomBlockComponents,
  CustomDecoratorComponentProps,
  CustomDecoratorComponents,
  Decoration,
  ExtendedRecordMap,
} from '@/types';

import { cn, getListNumber } from '@/lib/utils';

import Code from '@/components/notion/code';
import PageIcon from '@/components/notion/page-icon';
import { site } from '@/lib/site';
import AssetWrapper from '@/components/notion/asset-wrapper';

export const createRenderChildText =
  (customDecoratorComponents?: CustomDecoratorComponents) =>
  (properties: Decoration[]) => {
    return properties?.map(([text, decorations], i) => {
      if (!decorations) {
        return <React.Fragment key={i}>{text}</React.Fragment>;
      }

      return decorations.reduceRight(
        (element: any, decorator: any) => {
          const renderText = () => {
            switch (decorator[0]) {
              case 'h':
                return (
                  <span key={i} className={`notion-${decorator[1]}`}>
                    {element}
                  </span>
                );
              case 'c':
                return (
                  <code
                    key={i}
                    className="border-3 bg-foreground/10 ease-in-out rounded-md px-[0.4rem] py-[0.2rem] font-mono text-sm text-red-500"
                  >
                    {element}
                  </code>
                );
              case 'b':
                return <b key={i} className='font-semibold'>{element}</b>;
              case 'i':
                return <em key={i}>{element}</em>;
              case 's':
                return <s key={i}>{element}</s>;
              case 'a':
                return (
                  <Link
                    className="break-words text-inherit ease-in-out duration-150 hover:opacity-80 underline decoration-inherit underline-offset-2"
                    href={decorator[1]}
                    key={i}
                  >
                    {element}
                  </Link>
                );

              default:
                return <React.Fragment key={i}>{element}</React.Fragment>;
            }
          };

          const CustomComponent =
            customDecoratorComponents?.[
              decorator[0] as keyof typeof customDecoratorComponents
            ];

          if (CustomComponent) {
            const props = (
              decorator[1]
                ? {
                    decoratorValue: decorator[1],
                  }
                : {}
            ) as CustomDecoratorComponentProps<(typeof decorator)[0]>;

            return (
              <CustomComponent
                key={i}
                {...(props as any)}
                renderComponent={renderText}
              >
                {text}
              </CustomComponent>
            );
          }

          return renderText();
        },
        <>{text}</>
      );
    });
  };

interface BlockProps {
  block: Block;
  level: number;
  recordMap: ExtendedRecordMap;
  mapPageUrl: ((site: Site, recordMap: ExtendedRecordMap,pageId?: string) => string);
  mapImageUrl: (image: string, block: Block) => string;

  customBlockComponents?: CustomBlockComponents;
  customDecoratorComponents?: CustomDecoratorComponents;

  children?: React.ReactNode;
}

export function Block({
  block,
  children,
  level,
  recordMap,
  mapPageUrl,
  mapImageUrl,
  customBlockComponents,
  customDecoratorComponents,
}: BlockProps) {
  const blockMap = recordMap.block!;
  const renderComponent = () => {
    const renderChildText = createRenderChildText(customDecoratorComponents);

    if (level === 0 && block.type === 'collection_view') {
      (block as any).type = 'collection_view_page'
    }

    switch (block.type) {
      case 'collection_view_page':
        // fallthrough
      case 'page':
        if (level === 0) {
            if (!block.properties) {
              return null;
            }

            return (
              <div className="box-border font-sans">
                <main
                  className="max-w-4xl p-0 mx-auto my-0"
                >
                  <div className="text-4xl font-bold my-5">
                    {renderChildText(block.properties.title)}
                  </div>

                  <hr className="w-full my-5 mx-0 p-0 border-b border-foreground/20" />

                  {children}
                </main>
              </div>
            );
        } else {
          if (!block.properties) return null;
          return (
            <Link className="flex rounded-md text-foreground w-full no-underline h-8 items-center my-1 mx-0 transition-colors ease-in-out duration-150 hover:bg-foreground/10" href={mapPageUrl(site, recordMap, block.id)}>
              {block.format && (
                <div className="leading-7 mx-1 justify-center">
                  <PageIcon block={block} mapImageUrl={mapImageUrl} />
                </div>
              )}
              <div className="whitespace-nowrap overflow-hidden text-ellipsis font-medium leading-5 border-b my-1 mx-0">
                {renderChildText(block.properties.title)}
              </div>
            </Link>
          );
        }
      case 'header':
        if (!block.properties) return null;
        return (
          <h1 className="text-3xl font-semibold mt-6 py-1 pr-1">
            {renderChildText(block.properties.title)}
          </h1>
        );
      case 'sub_header':
        if (!block.properties) return null;
        return (
          <h2 className="text-2xl font-semibold mt-6 py-1 pr-1">
            {renderChildText(block.properties.title)}
          </h2>
        );
      case 'sub_sub_header':
        if (!block.properties) return null;
        return (
          <h3 className="text-xl font-semibold mt-6 py-1 pr-1">
            {renderChildText(block.properties.title)}
          </h3>
        );
      case 'divider':
        return <hr className="w-full my-2 mx-0 p-0 border-b border-foreground/20" />;
      case 'text':
        if (!block.properties) {
          return <div className="w-full min-h-[1rem] py-1 px-1 mx-1">&nbsp;</div>;
        }
        const blockColor = block.format?.block_color;
        return (
          <p
            className={cn(`whitespace-pre-wrap py-1 px-1`, blockColor && `notion-${blockColor}`)}
          >
            {renderChildText(block.properties.title)}
          </p>
        );
      case 'bulleted_list':
      case 'numbered_list':
        const wrapList = (content: React.ReactNode, start?: number) =>
          block.type === 'bulleted_list' ? (
            <ul className="m-0 ms-3 me-3 list-disc ps-6 marker:text-foreground/80">{content}</ul>
          ) : (
            <ol start={start} className="m-0 ms-3 me-3 list-decimal ps-6 marker:text-foreground/80 marker:font-semibold">
              {content}
            </ol>
          );

        let output: JSX.Element | null = null;

        if (block.content) {
          output = (
            <>
              {block.properties && (
                <li className='pl-1 whitespace-pre-wrap [&>p]:-ml-6 [&>p]:pl-0'>{renderChildText(block.properties.title)}</li>
              )}
              {wrapList(children)}
            </>
          );
        } else {
          output = block.properties ? (
            <li className='pl-1 whitespace-pre-wrap'>{renderChildText(block.properties.title)}</li>
          ) : null;
        }

        const isTopLevel =
          block.type !== blockMap[block.parent_id].value.type;
        const start = getListNumber(block.id, blockMap);

        return isTopLevel ? wrapList(output, start) : output;
      case 'to_do':
        {
        const isChecked = block.properties?.checked?.[0]?.[0] === 'Yes'

        return (
          <div>
            <input
              className="accent-cyan-500"
              type="checkbox"
              name=""
              id={block.id}
              checked={isChecked}
            />
            <label htmlFor={block.id}>{block.properties?.title}</label>
          </div>
        )
      }
      case 'image':
        // fallthrough
      case 'embed':
        // fallthrough
      case 'gist':
        // fallthrough
      case 'codepen':
        // fallthrough
      case 'video':
        return <AssetWrapper recordMap={recordMap} blockId={block.id} />
      case 'code': {
        if (block.properties.title) {
          const content = block.properties.title[0][0];
          const language = block.properties.language[0][0];
          return (
            <Code
              key={block.id}
              language={language || ''}
              code={content}
            />
          );
        }
        break;
      }
      case 'column_list':
        return <div className="flex overflow-hidden flex-col sm:flex-row w-full max-w-full">{children}</div>;
      case 'column':
        const spacerWidth = 46;
        const ratio = block.format.column_ratio;
        const columns = Number((1 / ratio).toFixed(0));
        const spacerTotalWidth = (columns - 1) * spacerWidth;
        const width = `calc((100% - ${spacerTotalWidth}px) * ${ratio})`;
        return (
          <>
            <div className="py-3 *:py-1 *:px-0 *:first:mt-0 *:last:mb-0" style={{ width }}>
              {children}
            </div>
            <div className="last:hidden" style={{ width: spacerWidth }} />
          </>
        );
      case 'quote':
        if (!block.properties) return null;
        return (
          <blockquote className="whitespace-pre-wrap break-words border-l-2 border-solid border-current py-1 px-3 m-0">
            {renderChildText(block.properties.title)}
          </blockquote>
        );
      case 'collection_view':
        return null;
      case 'callout':
        return (
          <div
            className={cn(
              'inline-flex w-full rounded-md border items-center box-border my-2 mx-0 p-4',
              block.format.block_color &&
                `notion-${block.format.block_color}`,
              block.format.block_color &&
                `notion-${block.format.block_color}_co`
            )}
          >
            <div>
              <PageIcon block={block} mapImageUrl={mapImageUrl} />
            </div>
            <div className="ml-2 whitespace-pre-line">
              {renderChildText(block.properties.title)}
            </div>
          </div>
        );
      case 'toggle':
        return (
          <details className="py-1 px-1 w-full inline marker:text-foreground/80">
            <summary className='cursor-pointer outline-none'>{renderChildText(block.properties.title)}</summary>
            <div className='ml-4 my-1'>{children}</div>
          </details>
        );
      default:
        if (process.env.NODE_ENV !== 'production') {
          console.log('Unsupported type ' + block?.type);
        }
        return <div />;
    }
    return null;
  };

  // Render a custom component first if passed.
  if (
    customBlockComponents &&
    customBlockComponents[block?.type] &&
    // Do not use custom component for base page block
    level !== 0
  ) {
    const CustomComponent = customBlockComponents[block?.type]!;
    return (
      <CustomComponent
        renderComponent={renderComponent}
        blockMap={blockMap}
        blockValue={block}
        level={level}
      >
        {children}
      </CustomComponent>
    );
  }

  return renderComponent();
}
