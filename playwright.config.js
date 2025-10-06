// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default defineConfig({
  timeout: 3000_000,
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ["list"], // Saída simples no console
    ["html", { open: "never" }], // Gera o relatório HTML, sem abrir automaticamente
  ],

  use: {
    browserName: "chromium",
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: ["--start-maximized"],
    },
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },
    {
      name: "chromium",
      use: {
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});
