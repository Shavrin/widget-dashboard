import styles from "./Dashboard.module.css";
import { Button } from "../Button";
import { useRef, useState } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { Widget, WidgetProps } from "../Widget/Widget.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";
// import { DndContext, useDroppable } from "@dnd-kit/core";

export function Dashboard() {
  const modalRef = useRef<DialogHandle>(null);
  const [widgets, setWidgets] = useState<WidgetProps[]>([
    {
      title: "counter",
      script:
        'const el = document.getElementById("root");\n' +
        "let i = 0;\n" +
        "\n" +
        "function counter() {\n" +
        "    el.innerHTML = i++;\n" +
        "    setTimeout(counter, 1000);\n" +
        "}\n" +
        "\n" +
        "counter();",
    },
    {
      title: "pokemon",
      script:
        "window.fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(response => response.json()).then((data) => document.getElementById(\"root\").textContent = JSON.stringify(data))\n",
    },
  ]);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const handleDragEnd = (event) => {
  //   const { delta } = event;
  //   setPosition((prevPosition) => ({
  //     x: prevPosition.x + delta.x,
  //     y: prevPosition.y + delta.y,
  //   }));
  // };
  function addWidget(widget: WidgetProps) {
    setWidgets((widgets) => [...widgets, widget]);
  }

  return (
    // <DndContext onDragEnd={handleDragEnd}>
    <div className={styles.dashboard}>
      <Button onClick={() => modalRef.current?.open()}>Add Widget</Button>
      <Button>Settings</Button>
      {widgets.map(({ title, script }) => (
        <Widget
          key={title}
          title={title}
          script={script}
          // position={position}
        />
      ))}

      <WidgetModal
        ref={modalRef}
        onAdd={(widget) => {
          addWidget(widget);
          modalRef.current?.close();
        }}
      />
    </div>
    // </DndContext>
  );
}
