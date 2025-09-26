// @ts-check
import { test, expect } from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";
import { PaginaBing } from "../pages/paginaBing/site";
import { LoginMicrosoft } from "../pages/login/login";

const nome = faker.person.fullName();
const authFile = path.join(__dirname, ".playwright-auth/.auth/user.json");

test.use({ locale: "pt-BR" });

test("Login conta Microsoft - Aprimorado", async ({ page, context }) => {
  test.setTimeout(120_000);

  const EMAIL = process.env.MS_EMAIL;
  const SENHA = process.env.MS_SENHA;

  const paginaBing = new PaginaBing(page);
  const loginMicrosoft = new LoginMicrosoft(page);

  if (!EMAIL || !SENHA) {
    throw new Error(
      "MS_EMAIL e MS_PASSWORD devem ser definidos em variáveis ​​de ambiente"
    );
  }

  await paginaBing.siteBing("https://www.bing.com/");
  await paginaBing.clicarBotaoEntrar();

  await loginMicrosoft.digitarEmail(EMAIL);
  await loginMicrosoft.clicarBotaoAvancar();
  await loginMicrosoft.clicarBotaoOutrasOpcoes();
  await loginMicrosoft.clicarBotaoUseSuaSenha();
  await loginMicrosoft.digitarSenha(SENHA);
  await loginMicrosoft.clicarBotaoParaSalvarLogin();

  // Salva o estado de autenticação APENAS se o login foi bem-sucedido
  await page.context().storageState({ path: authFile });
});

test.describe("Testes com Login Pré-Autenticado", () => {
  test.use({ storageState: authFile }); //CARREGA O ARQUIVO DE AUTENTICAÇÃO AQUI!

  test("Nome faker 01", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 02", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 03", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 04", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 05", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 06", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 07", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 08", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 09", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });

  test("Nome faker 10", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    ); // Verifica se o seu nome (ou algum indicador de login) está visível

    await paginaBing.fazerPesquisa(nome);
    await paginaBing.clicarBotaoPesquisar();
    await page.waitForTimeout(10000);
  });
});
