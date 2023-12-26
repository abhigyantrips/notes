import { EquationBlock } from '@/types';
import { getBlockTitle } from 'notion-utils';
import { BlockMath, InlineMath } from 'react-katex';
import { useNotionContext } from 'react-notion-x';

import * as React from 'react';

export function Equation({
  block,
  math,
  inline = false,
  className,
  ...rest
}: {
  block: EquationBlock;
  math?: string;
  inline?: boolean;
  className?: string;
}) {
  const { recordMap } = useNotionContext();
  math = math || getBlockTitle(block, recordMap);
  if (!math) return null;

  return inline ? (
    <InlineMath math={math} errorColor={'#cc0000'} {...rest} />
  ) : (
    <BlockMath math={math} errorColor={'#cc0000'} {...rest} />
  );
}
