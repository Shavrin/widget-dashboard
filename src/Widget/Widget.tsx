import { memo } from "react";

export type WidgetProps = {
  title: string;
  script: string;
};

const Widget = memo(({ title, script }: WidgetProps) => {
  return (
    <div className="hover:bg-cyan-700 border-2 hover:cursor-grabbing rounded-2xl bg-cyan-800 p-2 w-fit">
      {title}
      <iframe
        srcDoc={script}
        className="pointer-events-none select-none h-full w-full"
      />
    </div>
  );
});

export { Widget };
