import { memo } from "react";

export type WidgetProps = {
  title: string;
  script: string;
};

const Widget = memo(({ title, script }: WidgetProps) => {
  return (
    <div>
      {title}
      <iframe srcDoc={script} />
    </div>
  );
});

export { Widget };
