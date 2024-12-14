import { Button } from "../Button";
import { useRef, useState } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { Widget, WidgetProps } from "../Widget/Widget.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";

export function Dashboard() {
  const modalRef = useRef<DialogHandle>(null);
  const [widgets, setWidgets] = useState<WidgetProps[]>([
    {
      title: "counter",
      script:
        "<html><body><div id='root'></div><script>" +
        'const el = document.getElementById("root");\n' +
        "let i = 0;\n" +
        "\n" +
        "function counter() {\n" +
        "    el.innerHTML = i++;\n" +
        "    setTimeout(counter, 1000);\n" +
        "}\n" +
        "\n" +
        "counter();" +
        "</script></body></html>",
    },
    {
      title: "pokemon",
      script:
        "window.fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(response => response.json()).then((data) => document.getElementById(\"root\").textContent = JSON.stringify(data))\n",
    },
  ]);

  function addWidget(widget: WidgetProps) {
    setWidgets((widgets) => [...widgets, widget]);
  }

  return (
    <div className="h-full bg-cyan-950">
      <div className="fixed bottom-0 left-0 bg-white">
        <Button onClick={() => modalRef.current?.open()}>Add Widget</Button>
        <Button>Settings</Button>
      </div>
      {widgets.map(({ title, script }) => (
        <Widget key={title} title={title} script={script} />
      ))}
      <WidgetModal
        ref={modalRef}
        onAdd={(widget) => {
          addWidget(widget);
          modalRef.current?.close();
        }}
      />
    </div>
  );
}
