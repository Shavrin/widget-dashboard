import { test, expect, PlaywrightTestArgs } from "@playwright/test";

async function openCreateWidgetDialog(page: PlaywrightTestArgs["page"]) {
  await page.getByLabel("dashboard options").click();

  await page.getByRole("menuitem", { name: "Create widget" }).click();

  await expect(
    page.getByRole("heading", { name: "Create a widget" }),
  ).toBeVisible();
}

async function openEditWidgetDialog(
  page: PlaywrightTestArgs["page"],
  index: number = 0,
) {
  await page.getByLabel("widget").nth(index).hover();
  await page
    .getByRole("button", { name: "options", exact: true })
    .first()
    .click();
  await page.getByRole("menuitem", { name: "edit" }).click();

  await expect(
    page.getByRole("heading", { name: "Edit widget" }),
  ).toBeVisible();
}

async function createNewWidget(
  page: PlaywrightTestArgs["page"],
  widgetName: string,
) {
  await openCreateWidgetDialog(page);

  const widgetTypeDropdown = page.getByLabel("Choose widget type:");
  await expect(widgetTypeDropdown).toBeVisible();

  await widgetTypeDropdown.selectOption(widgetName);

  await page.getByRole("button", { name: "create" }).click();

  await expect(
    page.getByRole("heading", { name: "Create a widget" }),
  ).not.toBeVisible();
}

async function editWidget(
  page: PlaywrightTestArgs["page"],
  index: number = 0,
  widgetName: string,
) {
  await openEditWidgetDialog(page, index);

  const widgetTypeDropdown = page.getByLabel("Choose widget type:");
  await expect(widgetTypeDropdown).toBeVisible();

  await widgetTypeDropdown.selectOption(widgetName);

  await page.getByRole("button", { name: "edit" }).click();
}

async function removeWidget(
  page: PlaywrightTestArgs["page"],
  index: number = 0,
) {
  await page.getByLabel("widget").nth(index).hover();
  await page
    .getByRole("button", { name: "options", exact: true })
    .first()
    .click();
  await page.getByRole("menuitem", { name: "remove" }).click();
}

async function openSettingsDialog(page: PlaywrightTestArgs["page"]) {
  await page.getByLabel("dashboard options").click();

  await page.getByRole("menuitem", { name: "Settings" }).click();

  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
}

async function setSettings(
  page: PlaywrightTestArgs["page"],
  settings: { stickTo: "Left" | "Middle" | "Right" },
) {
  await openSettingsDialog(page);

  const stickToDropdown = page.getByLabel("Stick widgets to:");
  await expect(stickToDropdown).toBeVisible();

  await page.getByLabel("Stick widgets to:").selectOption(settings.stickTo);

  await expect(stickToDropdown).toHaveValue(settings.stickTo);

  await page.getByRole("button", { name: "save" }).click();

  await expect(
    page.getByRole("heading", { name: "Settings" }),
  ).not.toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
});

test("page has correct title, widgets, and options button", async ({
  page,
}) => {
  await expect(page).toHaveTitle("Widget Dashboard");

  await expect(page.getByLabel("widget")).toHaveCount(3);

  await expect(page.getByRole("button", { name: "Options" })).toBeVisible();
});

test("can create a new widget", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await createNewWidget(page, "RandomPokemon");

  await expect(page.getByLabel("widget")).toHaveCount(4);

  await expect(page.getByTestId("pokemon widget")).toHaveCount(2);
});

test("can abort creating a widget", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await openCreateWidgetDialog(page);

  await page.getByRole("button", { name: "cancel" }).click();

  await expect(
    page.getByRole("heading", { name: "Create a widget" }),
  ).not.toBeVisible();

  await expect(page.getByLabel("widget")).toHaveCount(3);
});

test("can remove widgets", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await removeWidget(page, 0);

  await expect(page.getByLabel("widget")).toHaveCount(2);

  await removeWidget(page, 0);

  await expect(page.getByLabel("widget")).toHaveCount(1);

  await removeWidget(page, 0);

  await expect(page.getByLabel("widget")).toHaveCount(0);
});

test("can edit widgets", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await editWidget(page, 0, "RandomPokemon");

  await expect(page.getByLabel("widget")).toHaveCount(3);

  await expect(page.getByTestId("pokemon widget")).toHaveCount(2);
});

test("can abort editing widgets", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);
  await openEditWidgetDialog(page, 1);

  await page.getByRole("button", { name: "cancel" }).click();

  await expect(
    page.getByRole("heading", { name: "Edit widget" }),
  ).not.toBeVisible();
});

test("widgets are preserved after refresh", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await createNewWidget(page, "RandomPokemon");
  await createNewWidget(page, "Timer");
  await createNewWidget(page, "RandomImage");

  await expect(page.getByLabel("widget")).toHaveCount(6);
  await expect(page.getByTestId("pokemon widget")).toHaveCount(2);
  await expect(page.getByTestId("timer widget")).toHaveCount(2);
  await expect(page.getByTestId("random image widget")).toHaveCount(2);

  await page.reload();

  await expect(page.getByLabel("widget")).toHaveCount(6);
  await expect(page.getByTestId("pokemon widget")).toHaveCount(2);
  await expect(page.getByTestId("timer widget")).toHaveCount(2);
  await expect(page.getByTestId("random image widget")).toHaveCount(2);
});

test("can change settings", async ({ page }) => {
  await expect(page.getByRole("main")).toHaveCSS("justify-content", "center");

  await setSettings(page, { stickTo: "Left" });

  await expect(page.getByRole("main")).toHaveCSS(
    "justify-content",
    "flex-start",
  );

  await setSettings(page, { stickTo: "Right" });

  await expect(page.getByRole("main")).toHaveCSS("justify-content", "flex-end");
});

test("can abort changing settings", async ({ page }) => {
  await setSettings(page, { stickTo: "Left" });

  await expect(page.getByRole("main")).toHaveCSS(
    "justify-content",
    "flex-start",
  );

  await page.reload();

  await expect(page.getByRole("main")).toHaveCSS(
    "justify-content",
    "flex-start",
  );
});
