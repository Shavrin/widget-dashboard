import { act, renderHook } from "@testing-library/react";
import { useWidgets } from "./useWidgets.ts";
import { Timer, RandomPokemon, RandomImage } from "../SampleWidgets";

test("retrieves default widgets when nothing is stored in localStorage", () => {
  const { result } = renderHook(useWidgets);

  expect(result.current).toEqual([
    [Timer, RandomPokemon, RandomImage],
    expect.any(Function),
    expect.any(Function),
  ]);
});

test("retrieves correct widgets from localStorage", () => {
  const customWidgets = [{ id: "1", script: "Custom widget" }];

  localStorage.setItem("widgets", JSON.stringify(customWidgets));

  const { result } = renderHook(useWidgets);

  expect(result.current).toEqual([
    customWidgets,
    expect.any(Function),
    expect.any(Function),
  ]);
});

test("allows saving widgets", () => {
  const localStorageSpy = vi.spyOn(Storage.prototype, "setItem");
  const customWidgets = [{ id: "1", script: "Custom widget" }];
  const { result } = renderHook(useWidgets);

  act(() => {
    // setLocalStorage
    result.current[1](customWidgets);
  });

  expect(localStorageSpy).toHaveBeenCalledWith(
    "widgets",
    JSON.stringify(customWidgets),
  );
});
