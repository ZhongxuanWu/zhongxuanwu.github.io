const { defineConfig } = require("@playwright/test");

const siteDirectory = process.env.SITE_DIR || "_site";

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: "disabled",
      maxDiffPixelRatio: 0.001,
    },
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "America/Chicago",
  },
  webServer: {
    command: `ruby -run -e httpd ${JSON.stringify(siteDirectory)} -p 4173 -b 127.0.0.1`,
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
