const AxeBuilder = require("@axe-core/playwright").default;
const { expect, test } = require("@playwright/test");

const homepages = [
  { language: "en", path: "/" },
  { language: "zh", path: "/zh/" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const themes = ["light", "dark"];

const seriousAccessibilityBaseline = {
  en: ["color-contrast:.more-authors", 'color-contrast:a[href="/"]'],
  zh: ['color-contrast:.active.nav-item:nth-child(1) > a[href$="zh/"]', "color-contrast:.more-authors", 'color-contrast:a[href="/"]'],
};

const representativePages = [
  ["publications-en", "/publications/"],
  ["publications-zh", "/zh/publications/"],
  ["projects-en", "/projects/"],
  ["projects-zh", "/zh/projects/"],
  ["services-en", "/services/"],
  ["services-zh", "/zh/services/"],
  ["news-en", "/news/"],
  ["news-zh", "/zh/news/"],
];

async function prepareStablePage(page, path, theme, viewport) {
  await page.setViewportSize(viewport);
  await page.addInitScript((selectedTheme) => {
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", selectedTheme);
  }, theme);

  await page.route(/googletagmanager|google-analytics|altmetric|dimensions\.ai/, (route) => route.abort());
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      walker.currentNode.nodeValue = walker.currentNode.nodeValue
        .replace(/©\s*Copyright\s*\d{4}/, "© Copyright YEAR")
        .replace(/©版权所有\s*\d{4}/, "©版权所有 YEAR");
    }

    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }";
    document.head.appendChild(style);
  });
}

function dynamicMasks(page) {
  return [page.locator(".altmetric-embed"), page.locator(".__dimensions_badge_embed__")];
}

for (const homepage of homepages) {
  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`@visual ${homepage.language} homepage ${viewport.name} ${theme}`, async ({ page }) => {
        await prepareStablePage(page, homepage.path, theme, viewport);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect(page).toHaveScreenshot(`homepage-${homepage.language}-${viewport.name}-${theme}.png`, {
          fullPage: true,
          mask: dynamicMasks(page),
        });
      });
    }
  }
}

for (const [name, path] of representativePages) {
  test(`@visual representative ${name}`, async ({ page }) => {
    await prepareStablePage(page, path, "light", { width: 1440, height: 1000 });
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      mask: dynamicMasks(page),
    });
  });
}

for (const homepage of homepages) {
  test(`@a11y ${homepage.language} homepage has no new serious accessibility violations`, async ({ page }) => {
    await prepareStablePage(page, homepage.path, "light", { width: 1440, height: 1000 });
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    const fingerprints = serious.flatMap((violation) => violation.nodes.map((node) => `${violation.id}:${node.target.join(" > ")}`)).sort();
    expect(fingerprints, JSON.stringify(serious, null, 2)).toEqual(seriousAccessibilityBaseline[homepage.language]);
  });
}

for (const homepage of homepages) {
  test(`${homepage.language} homepage links to LinkedIn from the sidebar`, async ({ page }) => {
    await page.goto(homepage.path, { waitUntil: "domcontentloaded" });

    const linkedInLink = page.locator('#sidebar a[href="https://www.linkedin.com/in/zhongxuanwu/"]');
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveText("LinkedIn");
    await expect(linkedInLink).toHaveAttribute("target", "_blank");
  });
}

test("theme and language controls retain their behavior", async ({ page }) => {
  await prepareStablePage(page, "/", "light", { width: 1440, height: 1000 });

  await page.locator("#light-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  const chineseLink = page.locator('a[href="/zh/"]').first();
  await expect(chineseLink).toBeVisible();
  await chineseLink.click();
  await expect(page).toHaveURL(/\/zh\/$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await expect(page.locator("h1.post-title")).toContainText("关于");
});

test("collection language controls resolve paired pages", async ({ page }) => {
  const pairs = [
    ["/projects/en/fef_dv/", "/zh/projects/zh/fef_dv/"],
    ["/zh/projects/zh/fef_dv/", "/projects/en/fef_dv/"],
    ["/news/en/20250426_neti/", "/zh/news/zh/20250426_neti/"],
    ["/zh/news/zh/20250426_neti/", "/news/en/20250426_neti/"],
    ["/news/en/20260826_plos_acceptance/", "/zh/news/zh/20260826_plos_acceptance/"],
    ["/zh/news/zh/20260826_plos_acceptance/", "/news/en/20260826_plos_acceptance/"],
  ];

  for (const [source, target] of pairs) {
    await page.goto(source, { waitUntil: "domcontentloaded" });
    await expect(page.locator(`a.nav-link[href="${target}"]`)).toBeVisible();
  }
});
