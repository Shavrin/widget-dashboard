import { act, renderHook } from "@testing-library/react";
import { StickTo, useSettings } from "./useSettings.ts";

test("retrieves default settings when nothing is stored in localStorage", () => {
  const { result } = renderHook(useSettings);

  expect(result.current).toEqual([
    { stickTo: StickTo.Middle },
    expect.any(Function),
    expect.any(Function),
  ]);
});

test("retrieves correct settings from localStorage", () => {
  const customSettings = { stickTo: StickTo.Middle };

  localStorage.setItem("widgets", JSON.stringify(customSettings));

  const { result } = renderHook(useSettings);

  expect(result.current).toEqual([
    customSettings,
    expect.any(Function),
    expect.any(Function),
  ]);
});

test("allows saving settings", () => {
  const localStorageSpy = vi.spyOn(Storage.prototype, "setItem");
  const customSettings = { stickTo: StickTo.Left };
  const { result } = renderHook(useSettings);

  act(() => {
    // setLocalStorage
    result.current[1](customSettings);
  });

  expect(localStorageSpy).toHaveBeenCalledWith(
    "settings",
    JSON.stringify(customSettings),
  );
});
