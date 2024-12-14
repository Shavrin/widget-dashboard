import { memo } from "react";

export type WidgetProps = {
  title: string;
  script: string;
};

const Widget = memo(({ title, script }: WidgetProps) => {
  return (
    <div className="p-3 hover:bg-green-400 border-2 hover:cursor-grabbing rounded-3xl">
      {title}
      <iframe srcDoc={script} className="pointer-events-none select-none" />
    </div>
  );
});

export { Widget };
