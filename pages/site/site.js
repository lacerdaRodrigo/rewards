import { test, expect } from "@playwright/test";

export class PaginaBing {
  constructor(page) {
    this.page = page;
  }

  async siteBing(url) {
    await this.page.goto(url, { waitUntil: "load" });
    await this.page.waitForTimeout(5500); // 5.5 segundos Espera a página carregar
  }

  async clicarBotaoEntrar() {
    const entrar = this.page.locator("#id_l");
    await entrar.waitFor({ state: "visible", timeout: 60000 });
    await entrar.click();
    await this.page.waitForTimeout(5500); // 5.5 segundos Espera a página carregar
  }
}
