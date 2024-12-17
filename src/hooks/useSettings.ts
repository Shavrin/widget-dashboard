import { useLocalStorage } from "usehooks-ts";

export type Settings = {
  stickTo: "Left" | "Right" | "Middle";
  gap: number;
};

export function useSettings() {
  return useLocalStorage<Settings>("settings", {
    stickTo: "Middle",
    gap: 8,
  });
}
