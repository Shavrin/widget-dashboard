import { memo, useRef } from "react";

export type WidgetProps = {
  title: string;
  script: string;
};

const Widget = memo(({ title, script }: WidgetProps) => {
  const iframeRef = useRef(null);

  const srcDoc = `
   <html>
      <head>title: ${title}</head>
      <body>
        <script>${script}</script>
      </body>
   </html>`;

  return <iframe ref={iframeRef} srcDoc={srcDoc}></iframe>;
});

export { Widget };
