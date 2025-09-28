Projeto desenvolvido com o auxílio de Inteligência Artificial (GitHub Copilot).

# Projeto Playwright Rewards

Este repositório automatiza o processo de obtenção de recompensas ao realizar pesquisas no buscador Bing da Microsoft, utilizando o [Playwright](https://playwright.dev/) para simular o comportamento humano. O sistema executa buscas automáticas que acumulam pontos no programa de recompensas do Bing, permitindo que esses pontos sejam trocados por prêmios. Todo o fluxo é cuidadosamente projetado para respeitar limites de segurança e evitar bloqueios por sistemas anti-bot, garantindo a qualidade e a confiabilidade da automação.

## Pré-requisitos para rodar o projeto

Antes de iniciar, certifique-se de que sua máquina possui os seguintes programas instalados:

- **Node.js** (versão recomendada: >= 18.x)
  - Site oficial: https://nodejs.org/
- **npm** (gerenciador de pacotes do Node, já incluso ao instalar o Node.js)
  - Documentação: https://docs.npmjs.com/
- **Playwright** (instalado via npm)
  - Documentação: https://playwright.dev/
  - Instalação: `npm install -D @playwright/test`
- **dotenv** (para variáveis de ambiente)
  - Documentação: https://www.npmjs.com/package/dotenv
  - Instalação: `npm install dotenv`
- **Faker.js** (para geração de dados fake nos testes)
  - Documentação: https://www.npmjs.com/package/@faker-js/faker
  - Instalação: `npm install @faker-js/faker`

> **Dica:** Após instalar o Node.js, basta rodar `npm ci` na raiz do projeto para instalar todas as dependências listadas acima automaticamente.

## Por que usamos o Playwright?

O Playwright é um framework moderno e robusto para automação de testes de aplicações web, desenvolvido pela Microsoft. Ele foi escolhido neste projeto por diversos motivos:

- **Desenvolvido pela Microsoft:** Traz confiabilidade, integração nativa com o ecossistema Microsoft e suporte contínuo.
- **Suporte a múltiplos navegadores:** Permite testar facilmente em Chromium, Firefox e WebKit.
- **Simulação avançada de usuário:** Possui recursos para simular o comportamento humano de forma realista, essencial para evitar bloqueios em sistemas de segurança.
- **API moderna e intuitiva:** Facilita a escrita, manutenção e leitura dos testes.
- **Execução rápida e paralela:** Otimiza o tempo de execução dos testes.

Por ser uma tecnologia recente e em constante evolução, o Playwright oferece vantagens competitivas em relação a frameworks mais antigos, tornando-o uma excelente escolha para automação de fluxos complexos como o deste projeto.

## Função pesquisaAleatorio

Para simular buscas humanas e naturais, o projeto utiliza a função `pesquisaAleatorio`, que retorna um termo de pesquisa aleatório a partir de um array extenso de buscas reais e populares. Isso aumenta a chance de as pesquisas serem contabilizadas pelo Bing Rewards.

Exemplo de uso:

```js
await paginaBing.fazerPesquisa(pesquisaAleatorio());
```

Você pode encontrar e editar a lista de termos dentro da função `pesquisaAleatorio` no arquivo `tests/test.spec.js`.

## Por que usamos o dotenv?

O [dotenv](https://www.npmjs.com/package/dotenv) é uma biblioteca que permite carregar variáveis de ambiente a partir de um arquivo `.env` para dentro do ambiente de execução do Node.js. Utilizamos o dotenv neste projeto para:

- **Gerenciar credenciais de forma segura:** Permitir que informações sensíveis, como e-mails, senhas e destinatários, fiquem fora do código-fonte.
- **Facilitar a configuração:** Cada usuário pode definir suas próprias variáveis de ambiente sem alterar o código do projeto.
- **Automatizar diferentes ambientes:** Possibilita rodar o projeto em diferentes máquinas ou pipelines apenas trocando o arquivo `.env`.

Assim, o uso do dotenv torna o projeto mais seguro, flexível e fácil de configurar, especialmente para automações que dependem de dados sensíveis ou variáveis que mudam conforme o ambiente.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **generate-pdf.js**: Script responsável por converter o relatório HTML dos testes em um arquivo PDF, facilitando o envio e o arquivamento dos resultados.

- **package.json**: Arquivo que gerencia todas as dependências, scripts de automação e metadados do projeto Node.js.

- **playwright.config.js**: Arquivo de configuração do Playwright, onde são definidos parâmetros como timeout, navegadores suportados, diretórios de testes e outras opções de execução.

- **pages/**: Diretório que centraliza a lógica de automação das páginas utilizadas nos testes, seguindo o padrão Page Object Model (POM):

  - **login/**: Contém scripts e funções para automação do fluxo de login.
    - `login.js`: Implementa os passos necessários para autenticação no Bing/Microsoft.
  - **paginaBing/**: Contém scripts para interações específicas com a página de buscas do Bing.
    - `site.js`: Implementa as ações de busca e manipulação da interface do Bing.

- **playwright-report/**: Pasta gerada automaticamente após a execução dos testes, contendo o relatório HTML detalhado dos resultados.

  - `index.html`: Arquivo principal do relatório visual dos testes.

- **test-results/**: Diretório onde são armazenados os resultados brutos e logs das execuções dos testes, útil para depuração e histórico.

- **tests/**: Diretório com os arquivos de especificação dos testes automatizados.

  - `test.spec.js`: Define os cenários, fluxos e validações que serão executados pelo Playwright.

- **.github/workflows/playwright.yml**: Arquivo de configuração da pipeline de integração contínua (CI) do GitHub Actions, responsável por automatizar a execução dos testes, geração de relatórios e envio de e-mails.

## Sobre a Pipeline (CI/CD)

A automação de testes e geração de relatórios é realizada por uma pipeline configurada no arquivo `.github/workflows/playwright.yml`, utilizando o GitHub Actions. O objetivo é garantir que todo push, pull request ou agendamento execute os testes de forma padronizada, confiável e sem intervenção manual.

### Etapas da Pipeline

1. **Disparo Automático**

   - A pipeline é executada automaticamente em três situações:
     - Push ou pull request para as branches `main` e `master`.
     - Agendamento diário às 06:00 da manhã (BRT), equivalente a 09:00 UTC, via cron.
   - Isso garante que o projeto esteja sempre validado e atualizado.

2. **Checkout do Código**

- Utiliza a ação `actions/checkout` para baixar o código do repositório e garantir que a versão mais recente será testada.

3. **Configuração do Ambiente Node.js**

- Instala a versão recomendada do Node.js usando `actions/setup-node`.

4. **Instalação de Dependências**

- Executa `npm ci` para instalar todas as dependências do projeto de forma limpa e reprodutível.

5. **Instalação do Navegador Playwright**

- Instala o Chromium e suas dependências para garantir que os testes rodem em ambiente controlado.

6. **Execução dos Testes Automatizados**

- Roda os testes Playwright com geração de relatório HTML detalhado.
- O comando utilizado é `npx playwright test --reporter=html`.

7. **Geração de Relatório em PDF**

- Executa o script `generate-pdf.js` para converter o relatório HTML em PDF, facilitando o compartilhamento e arquivamento dos resultados.

8. **Envio de E-mail com Relatório**

- Utiliza a action `dawidd6/action-send-mail` para enviar o relatório PDF por e-mail ao destinatário configurado nas variáveis de ambiente.
- O envio ocorre mesmo em caso de falha nos testes, garantindo visibilidade dos resultados.

### Boas Práticas e Dicas

- **Segurança:** As credenciais e destinatários de e-mail são gerenciados via GitHub Secrets, nunca ficando expostos no código.
- **Reprodutibilidade:** O uso de `npm ci` e instalação controlada de navegadores garante que os testes rodem sempre no mesmo ambiente.
- **Visibilidade:** O relatório em PDF é anexado ao e-mail, e o HTML fica disponível na pasta `playwright-report/`.
- **Automação Completa:** Não é necessário executar comandos manuais para validar o projeto após um push ou PR.

### Por que existem timeouts elevados?

Os testes simulam o comportamento humano, incluindo tempos de espera maiores entre ações. Isso é fundamental para evitar que sistemas de segurança identifiquem a automação como um bot, prevenindo bloqueios e captchas. Portanto, o tempo total de execução pode ser maior do que o habitual em automações tradicionais.

## Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lacerdaRodrigo/rewards.git
   cd rewards
   ```
2. **Instale as dependências:**
   ```bash
   npm ci
   ```
3. **Instale os navegadores do Playwright:**
   ```bash
   npx playwright install chromium --with-deps
   ```
4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` ou defina as variáveis necessárias:

   - `MS_EMAIL`: E-mail de login para os testes
   - `MS_SENHA`: Senha de login para os testes
   - (Para envio de e-mail, configure também `EMAIL_RELATORIO`, `SENHA_RELATORIO`, `REPORT_RECIPIENT` nos secrets do GitHub ou localmente se for testar o envio)

5. **Execute todos os testes:**

   ```bash
   npx playwright test --reporter=html
   ```

6. **Execute apenas o teste de login aprimorado em modo visual (headed):**
   Este comando executa somente o teste chamado "Login conta Microsoft - Aprimorado" abrindo o navegador para visualização:
   ```bash
   npx playwright test --headed -g "Login conta Microsoft - Aprimorado"
   ```
7. **Gerar relatório em PDF (opcional):**
   ```bash
   node generate-pdf.js
   ```

## Observações

Para dúvidas ou sugestões, abra uma issue no repositório.

© 2025 Rodrigo Lacerda. Todos os direitos reservados.
Este projeto é open source e está disponível sob a licença MIT.
Projeto desenvolvido com o auxílio de Inteligência Artificial (GitHub Copilot).

```

```
