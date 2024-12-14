import { Button } from "../Button";
import { useRef, useState } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { Widget, WidgetProps } from "../Widget/Widget.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";
import { Cog, Plus } from "../Icons.tsx";

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
    <div className="h-full bg-gradient-to-t from-cyan-950 to-cyan-800">
      <div className="fixed bottom-0 left-0 ml-3.5 mb-3.5">
        <Button onClick={() => modalRef.current?.open()}>
          <Plus />
        </Button>
        <Button>
          <Cog />
        </Button>
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
