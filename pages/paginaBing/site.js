import { test, expect } from "@playwright/test";

export class PaginaBing {
  constructor(page) {
    this.page = page;
  }

  async siteBing(url) {
    try {
      await this.page.goto(url, { waitUntil: "load" });
      await this.page.waitForTimeout(6000); // 6 segundos Espera a página carregar
    } catch (error) {
      console.error(`Erro ao navegar para ${url}:`, error);
      throw error;
    }
  }

  async clicarBotaoEntrar() {
    try {
      const entrar = this.page.locator("#id_l");
      await entrar.waitFor({ state: "visible", timeout: 60000 });
      await entrar.click();
      await this.page.waitForTimeout(6000); // 6 segundos Espera a página carregar
    } catch (error) {
      console.error("Erro ao clicar no botão Entrar:", error);
      throw error;
    }
  }

  async fazerPesquisa(pesquisaAleatorio) {
    try {
      const termoAleatorio = pesquisaAleatorio();
      if (!termoAleatorio) {
        console.log("⚠️ Nenhum termo restante para pesquisar!");
        return;
      }

      const termoPesquisa = pesquisaAleatorio();
      console.log(`Pesquisa aleatória selecionada: ${termoPesquisa}`);

      const inputDigitarPesquisar = await this.page.getByRole("textbox", {
        name: "0 caracteres de 2000",
      });

      await inputDigitarPesquisar.click();
      await inputDigitarPesquisar.type(termoPesquisa, { delay: 250 }); // simula digitação humana
    } catch (error) {
      console.error("Erro ao fazer a pesquisa:", error);
      throw error;
    }
  }

  async clicarBotaoPesquisar() {
    try {
      const clicarBotaoPesquisar = await this.page.locator("#search_icon svg");
      await clicarBotaoPesquisar.click();
    } catch (error) {
      console.error("Erro ao clicar no botão Pesquisar:", error);
      throw error;
    }
  }
}
