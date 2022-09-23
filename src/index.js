const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {
  Document,
  Paragraph,
  Packer,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
} = require('docx');

const questions = require('./questions.json');

const LETTERS = ['а', 'б', 'в', 'г', 'д'];
const DEFAULT_TEXT_STYLE = {
  size: 24,
  font: 'Times New Roman',
};
const HEADER = [
  new Paragraph({
    children: [
      new TextRun({
        text: 'КИЇВСЬКИЙ УНІВЕРСИТЕТ імені БОРИСА ГРІНЧЕНКА',
        ...DEFAULT_TEXT_STYLE,
        bold: true,
        size: 28,
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'Факультет інформаційних технологій та управління',
        ...DEFAULT_TEXT_STYLE,
        bold: true,
        size: 28,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: {
      after: 200,
    },
  }),
  new Table({
    borders: {
      left: { style: BorderStyle.NONE },
      top: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    columnWidths: [2005, 6005],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Спеціальність')],
          }),
          new TableCell({
            children: [new Paragraph('035 «Філологія»')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Спеціалізація')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                '035.06 Східні мови і література (переклад включно)'
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Освітня програма')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                '035.06.01 Мова і література (китайська), 035.06.02 Мова і література (японська)'
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('ОКР')],
          }),
          new TableCell({
            children: [new Paragraph('Бакалавр')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Дисципліна',
                    ...DEFAULT_TEXT_STYLE,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Інформаційні технології в східних мовах',
                    ...DEFAULT_TEXT_STYLE,
                    bold: true,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];

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
  // const questionsContent = questionsMarkup(randomQuestions);

  //   const content = `
  // <html>
  //   <head>
  //     <meta charset="utf-8">
  //     <title>Білет №${i + 1}</title>
  //   </head>
  //   <body>
  //     <h1>Білет №${i + 1}</h1>
  //     <p>1. Комплексний тест з дисципліни (20 балів)</p>
  //     ${questionsContent}
  //   </body>
  // </html>
  // `;
  //   const content = `
  // <html>
  //   <head>
  //     <meta charset="utf-8">
  //     <title>Білет №${i + 1}</title>
  //   </head>
  //   <body>
  //     <h1>Білет №${i + 1}</h1>
  //     <p>1. Комплексний тест з дисципліни (20 балів)</p>
  //     ${questionsContent}
  //   </body>
  // </html>
  // `;
  const docxContent = generateDocxMarkup(randomQuestions);

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
              before: 200,
              after: 200,
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
          ...docxContent,
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
function generateDocxMarkup(questions) {
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

function questionsMarkup(questions) {
  return questions
    .map((q) => {
      const { question, options } = q;
      return `
      <div class="question">
        <p>${question}</p>
        ${options
          .map((option, i) => `<p class="option">${LETTERS[i]}) ${option}</p>`)
          .join('')}
      </div>
  `;
    })
    .join('');
}

function writeFile(path, content) {
  fs.writeFile(path || `./output/${uuid}/index.html`, content, (err) => {
    if (err) throw err;
  });
}
