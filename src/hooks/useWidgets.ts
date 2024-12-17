import { CanvasPattern, RandomPokemon, Timer } from "../SampleWidgets";
import { useLocalStorage } from "usehooks-ts";
import { WidgetType } from "../Widget/types.ts";

const defaultWidgets = [Timer, RandomPokemon, CanvasPattern];

export function useWidgets() {
  return useLocalStorage<WidgetType[]>("widgets", defaultWidgets);
}
