import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-jsx';

import * as React from 'react';

export default function Code({
  code,
  language = 'javascript',
}: {
  code: string;
  language: string;
}) {
  const languageL = language.toLowerCase();
  const prismLanguage = languages[languageL] || languages.javascript;

  const langClass = `language-${language.toLowerCase()}`;

  return (
    <pre
      className={`box-border block overflow-x-scroll rounded-md px-4 py-8 font-mono ${langClass}`}
    >
      <code
        className={langClass}
        dangerouslySetInnerHTML={{
          __html: highlight(code, prismLanguage, language),
        }}
      />
    </pre>
  );
}
