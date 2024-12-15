import { useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../Button";
import { Cog, Plus } from "../Icons.tsx";
import { DialogHandle } from "../Modal/Modal.tsx";
import { TWidget, Widget } from "../Widget/Widget.tsx";
import { WidgetModal } from "../WidgetModal/WidgetModal.tsx";
import { v4 as uuid } from "uuid";

const defaultWidgets = [
  {
    id: uuid(),
    script: `
    <html style="height: 100%">
        <body style="height: 100%;margin: 0;">
            <div id='root' style="font-size: 3rem; font-family: sans-serif; font-weight: bold; color: white; height: 100%; display: flex; justify-content: center; align-items: center;"></div>
        </body>
        <script>
            const el = document.getElementById("root");

            (function counter() {
                el.innerHTML = new Date().toLocaleTimeString();
                setTimeout(counter, 1000);
            })()
            
        </script>
    </html>`,
  },
  {
    id: uuid(),
    title: "Pokemon",
    script: `
        <body style="overflow: hidden">
            <div id='root'></div>
            <script>
                window.fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
                .then(response => response.json())
                .then((data) =>{
                    const randomPokemon =data.results[Math.floor(Math.random()*data.results.length)];
                    
                    window.fetch(randomPokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            const sprite = data.sprites.front_default;
                            document.getElementById("root").innerHTML = "<img src='"  + sprite + "'/>" 
                    })
                })
                    
            </script>
        </body>`,
  },
];

export function Dashboard() {
  const modalRef = useRef<DialogHandle>(null);
  const [widgets, setWidgets] = useLocalStorage("widgets", defaultWidgets);

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
    <div className="h-full  flex justify-center items-center gap-5  flex-wrap bg-gradient-to-t from-cyan-950 to-cyan-900">
      <div className="fixed bottom-0 left-0 mb-3.5 ml-3.5 flex gap-2">
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
