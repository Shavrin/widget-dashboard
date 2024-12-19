import { act, renderHook } from "@testing-library/react";
import { defaultWidgets, useWidgets } from "./useWidgets.ts";
import { WidgetType } from "../Widget/Widget.tsx";

test("retrieves default widgets when nothing is stored in localStorage", () => {
  const { result } = renderHook(useWidgets);

  expect(result.current).toEqual([
    defaultWidgets,
    expect.any(Function),
    expect.any(Function),
  ]);
});

test("retrieves correct widgets from localStorage", () => {
  const customWidgets = [{ id: "1", widgetName: "Timer" }];

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
  const customWidgets: WidgetType[] = [{ id: "1", widgetName: "Timer" }];
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
