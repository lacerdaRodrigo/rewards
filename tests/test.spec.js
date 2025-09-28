// @ts-check
import { test, expect } from "@playwright/test";
import path from "path";
import { faker } from "@faker-js/faker";
import { PaginaBing } from "../pages/paginaBing/site";
import { LoginMicrosoft } from "../pages/login/login";
import fs from "fs";

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

  test("Executar 30 pesquisas aleatórias no Bing", async ({ page }) => {
    const paginaBing = new PaginaBing(page);

    // Abre só UMA vez
    await paginaBing.siteBing("https://www.bing.com/");

    await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
      "Rodrigo"
    );

    for (let i = 1; i <= 30; i++) {
      console.log(`🔁 Execução ${i}`);

      const termoAleatorio = pesquisaAleatorio();
      console.log("Pesquisa usada:", termoAleatorio);

      await paginaBing.fazerPesquisa(termoAleatorio);
      await paginaBing.clicarBotaoPesquisar();

      await page.waitForTimeout(10000);

      // Voltar para a home DO JEITO CERTO
      await page.goto("https://www.bing.com/");
    }
  });

  // test("Nome faker 01", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 02", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 03", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 04", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 05", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 06", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 07", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 08", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 09", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  // });

  // test("Nome faker 10", async ({ page }) => {
  //   const paginaBing = new PaginaBing(page);

  //   await paginaBing.siteBing("https://www.bing.com/");

  //   await expect(page.locator("//span[text()='Rodrigo']")).toHaveText(
  //     "Rodrigo"
  //   ); // Verifica se o seu nome (ou algum indicador de login) está visível

  //   await paginaBing.fazerPesquisa(pesquisaAleatorio);
  //   await paginaBing.clicarBotaoPesquisar();
  //   await page.waitForTimeout(10000);
  //   await limparPastaAuth();
  // });
});

function limparPastaAuth() {
  const pastaAuth = path.join(__dirname, ".playwright-auth/.auth");
  if (fs.existsSync(pastaAuth)) {
    const arquivos = fs.readdirSync(pastaAuth);
    for (const arquivo of arquivos) {
      fs.unlinkSync(path.join(pastaAuth, arquivo));
    }
  }
}

function pesquisaAleatorio() {
  const pesquisas = [
    "como fazer arroz",
    "qual a previsão do tempo",
    "o que é mais pesquisado no bing",
    "como perder peso rápido",
    "receita de bolo simples",
    "como aprender inglês sozinho",
    "melhor celular de 2024",
    "notícias de hoje",
    "como tirar passaporte",
    "como declarar imposto de renda",
    "qual o significado de sonhar com cobra",
    "como fazer feijão",
    "como limpar o fogão",
    "como plantar suculentas",
    "como funciona o pix",
    "como economizar dinheiro",
    "melhores filmes da netflix",
    "dicas para dormir melhor",
    "como fazer currículo",
    "como cortar cabelo em casa",
    "como instalar o whatsapp",
    "como configurar email",
    "como fazer chá de gengibre",
    "como melhorar a memória",
    "como aquecer comida no micro-ondas",
    "como estudar para concurso",
    "como fazer panqueca",
    "o que é inteligência artificial",
    "como parar de procrastinar",
    "como ganhar dinheiro na internet",
    "como limpar celular",
    "como fazer café",
    "como formatar computador",
    "como fazer exercício em casa",
    "como funciona cartão de crédito",
    "como aliviar dor de cabeça",
    "como fazer hambúrguer caseiro",
    "como aprender programação",
    "como baixar vídeos do youtube",
    "como tirar segunda via do rg",
    "como cuidar do cabelo",
    "como fazer alongamento",
    "como fazer detox",
    "como tirar mofo de parede",
    "como usar excel",
    "como lavar roupa na máquina",
    "como editar fotos no celular",
    "como limpar ar condicionado",
    "como melhorar a pele",
    "como fazer pizza em casa",
    "como criar uma conta no github",
    "como instalar vscode",
    "como criar senha forte",
    "como bloquear chamadas",
    "como ativar modo escuro",
    "como configurar wi-fi",
    "como usar pendrive",
    "como fazer backup de fotos",
    "como criar canal no youtube",
    "como baixar pdf",
    "como tirar print no pc",
    "como instalar impressora",
    "como fazer compra online",
    "como limpar panela queimada",
    "como fazer arroz doce",
    "como tocar violão",
    "como aprender espanhol",
    "como usar chatgpt",
    "como criar loja virtual",
    "como fazer marketing digital",
    "como abrir cnpj",
    "como consultar cpf",
    "como descobrir cep",
    "como pedir comida pelo ifood",
    "como usar canva",
    "como registrar domínio",
    "como depilar sobrancelha",
    "como cuidar da barba",
    "como tirar ferrugem",
    "como fazer conta no banco",
    "como pagar boleto pelo celular",
    "como trocar pneu",
    "como limpar caixa d'água",
    "como aumentar seguidores",
    "como vender pela internet",
    "como fazer login no gmail",
    "como ver mensagens apagadas",
    "como fazer miojo",
    "qual o melhor antivírus",
    "como atualizar windows",
    "como instalar apk",
    "como mudar senha do wi-fi",
    "como ganhar massa muscular",
    "como calcular porcentagem",
    "como usar calculadora científica",
    "como criar assinatura no email",
    "como medir pressão",
    "como fazer pão caseiro",
    "como fazer tapioca",
    "como usar airfryer",
    "como parar de fumar",
    "como tratar sinusite",
    "como colocar papel de parede",
    "como editar vídeo",
    "como criar apresentação no powerpoint",
    "como usar drive",
    "como mudar foto do instagram",
    "como fazer brownie",
    "como trocar foto do perfil",
    "como falar em público",
    "como colocar legenda em vídeo",
    "como limpar teclado",
    "como tirar mancha de roupa",
  ];

  const indice = Math.floor(Math.random() * pesquisas.length);
  return pesquisas[indice];
}
