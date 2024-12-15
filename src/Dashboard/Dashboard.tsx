import { Button } from "../Button";
import { useRef } from "react";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { TWidget, Widget } from "../Widget/Widget.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";
import { Cog, Plus } from "../Icons.tsx";
import { useLocalStorage } from "usehooks-ts";

export function Dashboard() {
  const modalRef = useRef<DialogHandle>(null);
  const [widgets, setWidgets] = useLocalStorage("widgets", [
    {
      id: "1",
      title: "Counter",
      script: `
        <div id='root'></div>
        <script>
            const el = document.getElementById("root");
            let i = 0;

            function counter() {
                el.innerHTML = i++;
                setTimeout(counter, 1000);
            }

            counter();
        </script>`,
    },
    {
      id: "2",
      title: "Pokemon",
      script: `
        <body style="overflow: hidden">
            <div id='root'></div>
            <script>
                window.fetch('https://pokeapi.co/api/v2/pokemon/ditto')
                .then(response => response.json())
                .then((data) => document.getElementById("root").textContent = JSON.stringify(data))
            </script>
        </body>`,
    },
  ]);

  function addWidget(widget: TWidget) {
    setWidgets((widgets) => [...widgets, widget]);
  }

  function removeWidget(id: string) {
    setWidgets((widgets) =>
      widgets.filter(({ id: widgetId }) => id !== widgetId),
    );
  }

  function editWidget({ id, title, script }: TWidget) {
    setWidgets((widgets) =>
      widgets.map((widget) =>
        widget.id === id ? { id, title, script } : widget,
      ),
    );
  }

  return (
    <div className="h-full bg-gradient-to-t from-cyan-950 to-cyan-900">
      <div className="fixed bottom-0 left-0 ml-3.5 mb-3.5 flex gap-2">
        <Button onClick={() => modalRef.current?.open()}>
          <Plus />
        </Button>
        <Button>
          <Cog />
        </Button>
      </div>

      {widgets.map(({ id, title, script }) => (
        <Widget
          key={id}
          id={id}
          title={title}
          script={script}
          remove={removeWidget}
          edit={editWidget}
        />
      ))}

      <WidgetModal
        ref={modalRef}
        onConfirm={(widget) => {
          addWidget(widget);
          modalRef.current?.close();
        }}
      />
    </div>
  );
}
