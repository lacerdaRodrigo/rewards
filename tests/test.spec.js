// @ts-check
import { test, expect } from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";

const nome = faker.person.fullName();
const authFile = path.join(__dirname, "..playwright/.auth/user.json");

test.use({ locale: "pt-BR" });

test("Login conta Microsoft - Aprimorado", async ({ page, context }) => {
  test.setTimeout(120_000);

  const EMAIL = process.env.MS_EMAIL;
  const SENHA = process.env.MS_SENHA;

  if (!EMAIL || !SENHA) {
    throw new Error(
      "MS_EMAIL e MS_PASSWORD devem ser definidos em variáveis ​​de ambiente"
    );
  }

  await page.goto("https://www.bing.com/", { waitUntil: "load" });
  await page.waitForTimeout(5500); // 5.5 segundos Espera a página carregar

  // Ações Iniciais clicar botão entrar
  //await page.locator("#bnp_btn_accept").click(); // Aceitar Cookies
  const entrar = await page.locator("#id_l");
  await entrar.waitFor({ state: "visible", timeout: 60000 });
  await entrar.click();
  await page.waitForTimeout(5500); // 5.5 segundos

  // Espera explícita para o H1 e o campo de e-mail
  await expect(page.locator("h1")).toHaveText("Entrar");
  await expect(page.getByLabel("Email ou número de telefone")).toBeVisible();
  await page.waitForTimeout(5500); // 5.5 segundos
  const email = page.getByLabel("Email ou número de telefone");
  await email.type(EMAIL, { delay: 250 }); // Digitação do E-mail (com delay)

  // PAUSA ESTRATÉGICA depois da digitação do e-mail
  await page.waitForTimeout(6000); // 6.0 segundos

  await page.getByTestId("primaryButton").click(); //Clicar botão avançar

  await page.waitForTimeout(6000); // 6.0 segundos

  const btnOutraManeira = await page.getByRole("button", {
    name: "Outras maneiras de entrar",
  });
  if (await btnOutraManeira.isVisible().catch(() => false)) {
    await btnOutraManeira.click();
  }

  // Espera que o botão 'Use sua senha' apareça
  await expect(
    page.getByRole("button", { name: "Use sua senha" })
  ).toBeVisible();
  await page.waitForTimeout(6000); // 6.0 segundos
  const useSenhaBtn = page.getByRole("button", { name: "Use sua senha" });
  await useSenhaBtn.click();

  // Espera que o campo de senha apareça
  await page.waitForTimeout(6000); // 6.0 segundos
  const senha = page.locator('input[type="password"]');
  await expect(senha).toBeVisible();
  await page.waitForTimeout(6000); // 6.0 segundos
  await senha.type(SENHA, { delay: 250 }); // Digitação da Senha (com delay)

  // PAUSA ESTRATÉGICA antes do clique no botão avançar
  await page.waitForTimeout(6000); // 6.0 segundos
  await page.getByTestId("primaryButton").click();

  // Espera que o botão 'Sim' (para manter o login) apareça
  await page.waitForTimeout(6000); // 6.0 segundos
  await expect(page.getByRole("button", { name: "Sim" })).toBeVisible();
  await page.getByRole("button", { name: "Sim" }).click();

  // Espera que a página inicial do Bing carregue e o seu nome apareça
  // await expect(page.getByText("Rodrigo")).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(6000); // 6.0 segundos
  // Salva o estado de autenticação APENAS se o login foi bem-sucedido
  await page.context().storageState({ path: authFile });
});

test.describe("Testes com Login Pré-Autenticado", () => {
  test.use({ storageState: authFile }); // <-- CARREGA O ARQUIVO DE AUTENTICAÇÃO AQUI!

  test("Nome faker 01", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 02", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 03", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 04", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 05", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 06", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 07", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 08", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 09", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });

  test("Nome faker 10", async ({ page }) => {
    const nome = faker.person.fullName();
    await page.goto("https://www.bing.com/");

    // Verifica se o seu nome (ou algum indicador de login) está visível
    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    const inputDigitarPesquisar = await page.getByRole("textbox", {
      name: "0 caracteres de 2000",
    });
    await inputDigitarPesquisar.click();
    await inputDigitarPesquisar.type(nome, { delay: 250 }); // simula digitação humana

    const clicarBotaoPesquisar = await page.locator("#search_icon svg");
    await clicarBotaoPesquisar.click();

    await page.waitForTimeout(10000);
  });
});
