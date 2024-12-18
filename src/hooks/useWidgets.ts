import { RandomImage, RandomPokemon, Timer } from "../SampleWidgets";
import { useLocalStorage } from "usehooks-ts";
import { type WidgetType } from "../Widget/Widget.ts";

const defaultWidgets = [Timer, RandomPokemon, RandomImage];

export function useWidgets() {
  return useLocalStorage<WidgetType[]>("widgets", defaultWidgets);
}
