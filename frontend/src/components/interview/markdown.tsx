import React, { FC, useMemo, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import "./markdown.scss";

const Markdown: FC = () => {
  const markdown = `A paragraph with *emphasis* and **strong importance**.
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
    
- Lists
- [ ] todo
- [x] done
    
A table:
    
| a | b |
| - | - |
| zxc | zxc |
    `;
  return (
    <div className="markdown">
      <ReactMarkdown plugins={[gfm]} children={markdown} />
    </div>
  );
};

export default Markdown;
