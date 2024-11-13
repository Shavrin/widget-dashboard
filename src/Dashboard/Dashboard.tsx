import styles from "./Dashboard.module.css";
import { Button } from "../Button";
import { useRef, useState } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { Widget, WidgetProps } from "../Widget/Widget.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";

export function Dashboard() {
  const modalRef = useRef<DialogHandle>(null);
  const [widgets, setWidgets] = useState<WidgetProps[]>([
    {
      title: "Zero",
      script: "document.body.append(document.createTextNode('Water'))",
    },
  ]);

  function addWidget(widget: WidgetProps) {
    setWidgets((widgets) => [...widgets, widget]);
  }

  return (
    <div className={styles.dashboard}>
      <Button onClick={() => modalRef.current?.open()}>Add Widget</Button>
      <Button>Settings</Button>
      {widgets.map(({ title, script }) => (
        <Widget key={title} title={title} script={script} />
      ))}

      <WidgetModal
        ref={modalRef}
        onAdd={(widget) => {
          addWidget(widget);
          modalRef.current?.close();
        }}
      ></WidgetModal>
    </div>
  );
}
