/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'react-split' {
  const content: any
  export = content
}

declare module '*.md' {
  const content: any
  export = content
}

declare module 'react-split-pane' {
  const content: any
  export = content
}

declare module 'agora-stream-player' {
  const content: any
  export = content
}

declare module 'react-copy-to-clipboard' {
  const content: any
  export = content
}

declare module 'socket.io-client' {
  const content: any
  export = content
}

declare module 'draggable' {
  const content: any
  export = content
}

declare module 'for-editor' {
  const content: any
  export = content
}

declare module 'jspdf' {
  const content: any
  export = content
}

declare module 'markdown' {
  const content: any
  export = content
}