import { RandomImage, RandomPokemon, Timer } from "../SampleWidgets";
import { useLocalStorage } from "usehooks-ts";
import { WidgetType } from "../Widget/types.ts";

const defaultWidgets = [Timer, RandomPokemon, RandomImage];

export function useWidgets() {
  return useLocalStorage<WidgetType[]>("widgets", defaultWidgets);
}
