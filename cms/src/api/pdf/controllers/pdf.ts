import { factories } from '@strapi/strapi';
import { sendMessage } from '../services/websocket';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import hljs from 'highlight.js';

const cssPath = "C:/sbangar/workspace/FullstackAI/FullStack.AI/cms/node_modules/highlight.js/styles/atom-one-dark.css"
const highlightCss = fs.readFileSync(cssPath, 'utf-8');


// Define interfaces for Answer and Question
interface Answer {
  id: number;
  content: string;
}

interface Question {
  id: number;
  Content: string;
  answers: Answer[];
}

export default factories.createCoreController('api::pdf.pdf', ({ strapi }) => ({
  async generatePdf(ctx) {
    try {
      const userId = Array.isArray(ctx.request.headers['x-user-email'])
        ? ctx.request.headers['x-user-email'][0]
        : ctx.request.headers['x-user-email'];

      const sessionKey = ctx.request.body?.sessionKey || userId;

      if (!sessionKey) {
        return ctx.throw(400, 'Session key is missing');
      }

      const selectedQuestions = ctx.request.body?.selectedQuestions || [];
      const fileName = ctx.request.body?.fileName;
      const topicName = ctx.request.body?.topicName;

      if (!selectedQuestions.length || !fileName || !topicName) {
        return ctx.throw(400, 'Missing required parameters');
      }

      const projectRoot = path.resolve(__dirname); // The directory of the current file
      const storagePath = process.env.PDF_STORAGE_PATH || path.join(projectRoot, 'storage', 'pdfs');

      // Ensure the directory exists
      if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, { recursive: true });
      }

      const filePath = `${storagePath}/${fileName}`;

      // Notify client that PDF generation has started
      sendMessage(sessionKey, { status: 'in-progress', message: 'PDF generation started' });

      const questionsResponse = await strapi.entityService.findMany('api::question.question', {
        filters: { id: { $in: selectedQuestions } },
        populate: { answers: true },
      });

      const questions: Question[] = questionsResponse.map((question: any) => ({
        id: question.id,
        Content: question.Content,
        answers: question.answers.map((answer: any) => ({
          id: answer.id,
          content: answer.content,
        })),
      }));

      const filteredQuestions = questions.filter(q => q.answers && q.answers.length > 0);

   const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${highlightCss}  
  </style>
  <style>
    body {
      font-family: Georgia, serif;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      // padding-top: 50px;
    }
    .topic-name {
      font-size: 30px;
      font-weight: normal;
      text-align: center;
      margin-top: 7px; /* Set to 0 or reduce */
      margin-bottom: 7px; /* Keep it minimal */
      padding-top: 0; /* Remove unnecessary padding */
      color: #333;
    }
    .question {
      margin-bottom: 15px;
      page-break-inside: avoid;
    }
    .question-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .answer {
      font-size: 14px;
      margin-left: 10px;
      margin-bottom: 10px;
      color: #555;
      background-color: rgba(229, 231, 235, 0.8);
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    pre {
      background: #272822;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      font-size: 13px;
      line-height: 1.5;
    }
    code {
      font-family: 'Courier New', Courier, monospace;
    }
  </style>
</head>
<body>
  <div class="topic-name">${topicName}</div>
  ${filteredQuestions
    .map(
      (q, i) => `
      <div class="question">
        <div class="question-title">Q${i + 1}: ${q.Content}</div>
        ${q.answers
          .map((a, j) => {
            const contentParts = a.content.split('```');
            const formattedAnswer = contentParts
              .map((part, index) =>
                index % 2 === 0
                  ? `<div>${part}</div>` // Regular text
                  : `<pre><code>${hljs.highlightAuto(part).value}</code></pre>` // Code block
              )
              .join('');

            return `
              <div class="answer">
                <strong>Answer ${j + 1}:</strong>
                ${formattedAnswer}
              </div>
            `;
          })
          .join('')}
      </div>
    `
    )
    .join('')}
</body>
</html>
`;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(htmlContent);

      const pdfBuffer = await page.pdf({
        printBackground: true,
        format: 'A4',
        displayHeaderFooter: true,
        headerTemplate: `<div style="font-size: 13px; font-weight: normal; font-style: italic; text-align: center; width: 100%; padding: 2px 0;margin-bottom: 5px;">Elevar.AI - Kill Your Interview</div>`,
        footerTemplate: `<div style="font-size: 13px; text-align: center; width: 100%; padding: 10px 0;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
        margin: { top: '40px', bottom: '80px', left: '40px', right: '40px' },

    });
    

      await browser.close();
      fs.writeFileSync(filePath, pdfBuffer);

      if (sessionKey) {
        // Notify client that the PDF generation is completed
        sendMessage(sessionKey, { status: 'completed', message: 'PDF generated successfully', filePath });
      }
      ctx.body = { message: 'PDF generation started' };
    } catch (error) {
      ctx.throw(500, `Failed to generate PDF: ${error.message}`);
    }
  },

  async downloadPdf(ctx) {
    try {
      const fileName = ctx.request.body?.fileName;
      const storagePath = process.env.PDF_STORAGE_PATH || path.join(path.resolve(__dirname), 'storage', 'pdfs');
      const filePath = `${storagePath}/${fileName}`;

      if (!fs.existsSync(filePath)) {
        ctx.throw(404, 'File not found');
      }

      ctx.set('Content-Type', 'application/pdf');
      ctx.set('Content-Disposition', `attachment; filename="${fileName}"`);

      ctx.body = fs.createReadStream(filePath);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      ctx.throw(500, 'Error downloading PDF');
    }
  },
}));
