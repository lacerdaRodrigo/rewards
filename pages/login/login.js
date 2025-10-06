import { test, expect } from "@playwright/test";

export class LoginMicrosoft {
  constructor(page) {
    this.page = page;
  }

  async digitarEmail(EMAIL) {
    try {
      await expect(this.page.locator("h1")).toHaveText("Entrar");
      await expect(
        this.page.getByLabel("Email ou número de telefone")
      ).toBeVisible();

      await this.page.waitForTimeout(6000); // 6 segundos Espera a página carregar
      const email = this.page.getByLabel("Email ou número de telefone");
      await email.type(EMAIL, { delay: 250 }); // Digitação do E-mail (com delay)
      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    } catch (error) {
      console.error("Erro ao digitar o email:", error);
      throw error;
    }
  }

  async clicarBotaoAvancar() {
    try {
      await this.page.getByTestId("primaryButton").click();
      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    } catch (error) {
      console.error("Erro ao clicar no botão Avançar:", error);
      throw error;
    }
  }

  async clicarBotaoOutrasOpcoes() {
    try {
      const btnOutraManeira = await this.page.getByRole("button", {
        name: "Outras maneiras de entrar",
      });

      if (await btnOutraManeira.isVisible().catch(() => false)) {
        await btnOutraManeira.click();
        await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
      }
    } catch (error) {
      console.error("Erro ao clicar no botão Outras Opções:", error);
      throw error;
    }
  }

  async clicarBotaoUseSuaSenha() {
    try {
      await expect(
        this.page.getByRole("button", { name: "Use sua senha" })
      ).toBeVisible();

      const useSenhaBtn = this.page.getByRole("button", {
        name: "Use sua senha",
      });
      await useSenhaBtn.click();
      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    } catch (error) {
      console.error("Erro ao clicar no botão Use sua Senha:", error);
      throw error;
    }
  }

  async digitarSenha(SENHA) {
    try {
      const senha = this.page.locator('input[type="password"]');
      await expect(senha).toBeVisible();
      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
      await senha.type(SENHA, { delay: 250 }); // Digitação da Senha (com delay)

      // PAUSA ESTRATÉGICA antes do clique no botão avançar
      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
      await this.clicarBotaoAvancar();
      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    } catch (error) {
      console.error("Erro ao digitar a senha:", error);
      throw error;
    }
  }

  async clicarBotaoParaSalvarLogin() {
    try {
      await expect(
        this.page.getByRole("button", { name: "Sim" })
      ).toBeVisible();
      await this.page.getByRole("button", { name: "Sim" }).click();

      await this.page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    } catch (error) {
      console.error("Erro ao clicar no botão para salvar login:", error);
      throw error;
    }
  }
}
