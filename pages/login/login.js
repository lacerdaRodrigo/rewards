import { test, expect } from "@playwright/test";

export class LoginMicrosoft {
  constructor(page) {
    this.page = page;
  }

  async digitarEmail(EMAIL) {
    await expect(page.locator("h1")).toHaveText("Entrar");
    await expect(page.getByLabel("Email ou número de telefone")).toBeVisible();

    await page.waitForTimeout(5500); // 5.5 segundos Espera a página carregar
    const email = page.getByLabel("Email ou número de telefone");
    await email.type(EMAIL, { delay: 250 }); // Digitação do E-mail (com delay)
    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
  }

  async clicarBotaoAvancar() {
    await page.getByTestId("primaryButton").click();
    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
  }

  async clicarBotaoOutrasOpcoes() {
    const btnOutraManeira = await page.getByRole("button", {
      name: "Outras maneiras de entrar",
    });

    if (await btnOutraManeira.isVisible().catch(() => false)) {
      await btnOutraManeira.click();
      await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    }
  }

  async clicarBotaoUseSuaSenha() {
    await expect(
      page.getByRole("button", { name: "Use sua senha" })
    ).toBeVisible();

    const useSenhaBtn = page.getByRole("button", { name: "Use sua senha" });
    await useSenhaBtn.click();
    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
  }

  async digitarSenha(SENHA) {
    const senha = page.locator('input[type="password"]');
    await expect(senha).toBeVisible();
    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    await senha.type(SENHA, { delay: 250 }); // Digitação da Senha (com delay)

    // PAUSA ESTRATÉGICA antes do clique no botão avançar
    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
    await this.clicarBotaoAvancar();
    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
  }

  async clicarBotaoParaSalvarLogin() {
    await expect(page.getByRole("button", { name: "Sim" })).toBeVisible();
    await page.getByRole("button", { name: "Sim" }).click();

    await page.waitForTimeout(6000); // 6.0 segundos Espera a página carregar
  }
}
