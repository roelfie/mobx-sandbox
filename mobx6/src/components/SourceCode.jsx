import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SourceCode = ({ sourcecode }) => {
  return (
    <SyntaxHighlighter language='javascript' style={docco}>
      {sourcecode}
    </SyntaxHighlighter>
  );
};

export default SourceCode;
