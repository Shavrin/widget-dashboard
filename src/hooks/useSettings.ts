import { useLocalStorage } from "usehooks-ts";

export const StickTo = {
  Left: "Left",
  Middle: "Middle",
  Right: "Right",
} as const;

export type StickTo = keyof typeof StickTo;

export type Settings = {
  stickTo: StickTo;
  gap: number;
};

export function useSettings() {
  return useLocalStorage<Settings>("settings", {
    stickTo: StickTo.Middle,
    gap: 8,
  });
}
