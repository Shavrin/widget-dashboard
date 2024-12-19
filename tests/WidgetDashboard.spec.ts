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
  widgetScript: string,
) {
  await openCreateWidgetDialog(page);

  await expect(page.getByText("root")).toBeVisible();

  await page.getByLabel("Editor content;Press Alt+F1").clear();
  await page.getByLabel("Editor content;Press Alt+F1").fill(widgetScript);

  await page.getByRole("button", { name: "create" }).click();

  await expect(
    page.getByRole("heading", { name: "Create a widget" }),
  ).not.toBeVisible();
}

async function editWidget(
  page: PlaywrightTestArgs["page"],
  index: number = 0,
  widgetScript: string,
) {
  await openEditWidgetDialog(page, index);

  await page.getByLabel("Editor content;Press Alt+F1").clear();

  await page.getByLabel("Editor content;Press Alt+F1").fill(widgetScript);

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

function getWidgetContent(page: PlaywrightTestArgs["page"], index: number = 0) {
  return page
    .getByLabel("widget")
    .nth(index)
    .getByTitle("widget content")
    .contentFrame();
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

test("page has correct title", async ({ page }) => {
  await expect(page).toHaveTitle("Widget Dashboard");
});

test("has 3 widgets in the beginning and options button", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await expect(page.getByRole("button", { name: "Options" })).toBeVisible();
});

test("can create a new widget", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await createNewWidget(page, "<button>test</button>");

  await expect(page.getByLabel("widget")).toHaveCount(4);

  await expect(
    getWidgetContent(page, 3).getByRole("button", { name: "test" }),
  ).toBeVisible();
});

test("can abort creating a widget", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await openCreateWidgetDialog(page);

  await page.locator(".view-lines > div:nth-child(3)").click();
  await page
    .getByLabel("Editor content;Press Alt+F1")
    .fill("<button>test</button>");

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

  await editWidget(page, 1, "<button>test</button>");

  await expect(page.getByLabel("widget")).toHaveCount(3);

  await expect(
    getWidgetContent(page, 1).getByRole("button", { name: "test" }),
  ).toBeVisible();
});

test("can abort editing widgets", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);
  await openEditWidgetDialog(page, 1);

  await page.getByRole("button", { name: "cancel" }).click();

  await expect(
    page.getByRole("heading", { name: "Edit widget" }),
  ).not.toBeVisible();

  await expect(
    getWidgetContent(page, 1).getByRole("button", { name: "test" }),
  ).not.toBeVisible();
});

test("widgets are preserved after refresh", async ({ page }) => {
  await expect(page.getByLabel("widget")).toHaveCount(3);

  await createNewWidget(page, "<button>1</button>");
  await createNewWidget(page, "<button>2</button>");
  await createNewWidget(page, "<button>3</button>");

  await expect(page.getByLabel("widget")).toHaveCount(6);

  await expect(
    getWidgetContent(page, 3).getByRole("button", { name: "1" }),
  ).toBeVisible();
  await expect(
    getWidgetContent(page, 4).getByRole("button", { name: "2" }),
  ).toBeVisible();
  await expect(
    getWidgetContent(page, 5).getByRole("button", { name: "3" }),
  ).toBeVisible();

  await page.reload();

  await expect(page.getByLabel("widget")).toHaveCount(6);

  await expect(
    getWidgetContent(page, 3).getByRole("button", { name: "1" }),
  ).toBeVisible();
  await expect(
    getWidgetContent(page, 4).getByRole("button", { name: "2" }),
  ).toBeVisible();
  await expect(
    getWidgetContent(page, 5).getByRole("button", { name: "3" }),
  ).toBeVisible();
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
