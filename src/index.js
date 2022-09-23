const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { Document, Paragraph, Packer, TextRun, AlignmentType } = require('docx');

const { HEADER } = require('./lib/header');
const { FOOTER } = require('./lib/footer');
const { DEFAULT_TEXT_STYLE } = require('./lib/defaultTextStyle');
const questions = require('./questions.json');
const tasks = require('./practice.json');

const LETTERS = ['а', 'б', 'в', 'г', 'д'];

// get files count to generate from arguments
const fileCount = process.argv[2] || 1;

// check if output directory exists
if (!fs.existsSync('./output')) {
  fs.mkdirSync('./output');
}

const uuid = uuidv4();
fs.mkdirSync(`./output/${uuid}`);

for (let i = 0; i < fileCount; i++) {
  const fileName = `Білет №${i + 1}.docx`;
  // get 20 unique random questions
  const randomQuestions = questions
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  const randomTasks = tasks.sort(() => Math.random() - 0.5).slice(0, 2);

  const docxQuestions = generateQuestionsDocxMarkup(randomQuestions);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...HEADER,
          new Paragraph({
            children: [
              new TextRun({
                text: `БІЛЕТ №${i + 1}`,
                bold: true,
                ...DEFAULT_TEXT_STYLE,
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
              after: 400,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '1. Комплексний тест з дисципліни (20 балів)',
                ...DEFAULT_TEXT_STYLE,
              }),
            ],
          }),
          ...docxQuestions,
          new Paragraph({
            children: [
              new TextRun({
                text: '2. Практичне завдання №1 (10 балів)',
                ...DEFAULT_TEXT_STYLE,
              }),
            ],
          }),
          ...randomTasks[0].map((p) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: p,
                  ...DEFAULT_TEXT_STYLE,
                }),
              ],
              bullet: { level: 0 },
            });
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '3. Практичне завдання №2 (10 балів)',
                ...DEFAULT_TEXT_STYLE,
              }),
            ],
          }),
          ...randomTasks[1].map((p) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: p,
                  ...DEFAULT_TEXT_STYLE,
                }),
              ],
              bullet: { level: 0 },
            });
          }),
          ...FOOTER,
        ],
      },
    ],
  });

  //save file
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`./output/${uuid}/${fileName}`, buffer);
  });

  // writeFile(`./output/${uuid}/${fileName}`, content);
}

// function that generates docx markup with questions
function generateQuestionsDocxMarkup(questions) {
  const result = [];
  questions.forEach((q, i) => {
    const { question, options } = q;
    result.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `1.${i + 1}. ${question}`,
            ...DEFAULT_TEXT_STYLE,
          }),
        ],
      })
    );
    options.forEach((o, j) =>
      result.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${LETTERS[j]}) ${o}`,
              ...DEFAULT_TEXT_STYLE,
            }),
          ],
          indent: { left: 200 },
        })
      )
    );
  });
  return result;
}
