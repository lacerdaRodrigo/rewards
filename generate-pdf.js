// generate-pdf.js
import { chromium } from "playwright";

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Abre o relatório gerado pelo Playwright
  await page.goto(`file://${process.cwd()}/playwright-report/index.html`, {
    waitUntil: "networkidle",
  });

  // Salva como PDF
  await page.pdf({
    path: "report.pdf",
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  console.log("✅ PDF gerado com sucesso: report.pdf");
}

generatePDF();
