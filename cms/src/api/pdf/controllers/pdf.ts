import { factories } from '@strapi/strapi';
import { sendMessage } from '../services/websocket';
const puppeteer = require('puppeteer');
const fs = require('fs');

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

      let selectedQuestions = ctx.request.body?.selectedQuestions || [];
      const fileName = ctx.request.body?.fileName;
      const topicName = ctx.request.body?.topicName;
      const pdfStoragePath = process.env.PDF_STORAGE_PATH || "C:/sbangar/personal/FilePath";
      if (selectedQuestions.length > 0) {
        selectedQuestions = Array.from({ length: 100 }, (_, i) => i + 1); // Default to [1, 2, ..., 100]
      }

      if (!fs.existsSync(pdfStoragePath)) {
        fs.mkdirSync(pdfStoragePath, { recursive: true });
      }
      const filePath = `${pdfStoragePath}/${fileName}`;
      if (userId) {
        sendMessage(userId, { status: 'in-progress', message: 'PDF generation started' });
      }

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
        body {
            font-family: Georgia;
            margin: 0;
            padding: 0;
            line-height: 1.5;
            padding-top: 50px;
        }
        .heading {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          margin-top: 50px;
          margin-bottom: 20px;
          color: #222;
        }
        .topic-name {
          font-size: 20px;
          font-weight: normal;
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        .watermark {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: -1;
          pointer-events: none;
          transform: rotate(-45deg);
          font-size: 60px;
          font-weight: bold;
          color: rgba(50, 50, 50, 0.5);
        }
        .question {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .question.new-page {
          page-break-before: always;
        }
        .question-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }
        .answer {
          font-size: 14px;
          margin-left: 20px;
          margin-bottom: 10px;
          color: #555;
        }
        .page {
          page-break-inside: avoid;
          margin-bottom: 20px;
          padding-left: 50px;
          padding-right: 50px;
        }
      </style>
    </head>
    <body>
      <div class="watermark">Elevar.AI</div>
     <div class="topic-name" style="margin-top: 0;">
      ${topicName}
    </div>
      ${filteredQuestions
          .map((q, i) => {
            const shouldForceNewPage = q.answers.some((a) => a.content.length > 500);
            return `
            <div class="page">
              <div class="question ${shouldForceNewPage ? 'new-page' : ''}">
                <div class="question-title">Q${i + 1}: ${q.Content}</div>
                ${q.answers.length > 1
                ? q.answers
                  .map((a, j) => `
                    <div class="answer">
                      <strong>Answer ${j + 1}:</strong>
                      <div>${a.content}</div>
                    </div>
                    <br/>
                  `)
                  .join('')
                : `
                    <div class="answer">
                      <strong>Answer:</strong>
                      <div>${q.answers[0]?.content}</div>
                    </div>
                    <br/>
                  `
              }
              </div>
            </div>
          `;
          })
          .join('')}
    </body>
    </html>
          `;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(htmlContent);

      await page.addStyleTag({
        content: `
          @page {
            margin-bottom: 0;
          }
          .date-time {
            display: none !important;
          }
        `,
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        displayHeaderFooter: true,
        headerTemplate: `
    <div style="font-size: 16px; font-weight: normal; font-style: italic; text-align: center; width: 100%; padding: 2px 0;">
      Elevar.AI - Kill Your Interview
    </div>`,
        footerTemplate: `
    <div style="font-size: 10px; text-align: center; width: 100%; padding: 10px 0;">
      <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>`,
        margin: { top: '40px', bottom: '50px', left: '50px', right: '50px' }, // Increase top margin if needed
      });


      await browser.close();
        fs.writeFileSync(filePath, pdfBuffer);
        if (userId) {
          sendMessage(userId, { status: 'completed', message: 'PDF generated successfully', filePath });
        }
      ctx.body = { message: 'PDF generation started' };
    } catch (error:any) {
      ctx.throw(500, `Failed to generate PDF: ${error.error}`);
    }
  },
  async downloadPdf(ctx) {
    try {

      const fileName = ctx.request.body?.fileName;
      const pdfStoragePath = process.env.PDF_STORAGE_PATH || "C:/sbangar/personal/FilePath";
      const filePath = `${pdfStoragePath}/${fileName}`;
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        ctx.throw(404, 'File not found');
      }

      // Set headers for the file download
      ctx.set('Content-Type', 'application/pdf');
      ctx.set('Content-Disposition', `attachment; filename="generated-SachinBangar.pdf"`);

      // Stream the file to the response body
      ctx.body = fs.createReadStream(filePath);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      ctx.throw(500, 'Error downloading PDF');
    }
  },
}));
