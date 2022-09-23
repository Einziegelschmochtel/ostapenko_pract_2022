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
  Footer,
  SectionType,
} = require('docx');

const { DEFAULT_TEXT_STYLE } = require('./defaultTextStyle');

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
    columnWidths: [2005, 8005],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Спеціальність', ...DEFAULT_TEXT_STYLE }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: '035 «Філологія»',
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Спеціалізація', ...DEFAULT_TEXT_STYLE }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: '035.06 Східні мови і література (переклад включно)',
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
            ],
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
                    text: 'Освітня програма',
                    ...DEFAULT_TEXT_STYLE,
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
                    text: '035.06.01 Мова і література (китайська), 035.06.02 Мова і література (японська)',
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
            ],
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
                    text: 'ОКР',
                    ...DEFAULT_TEXT_STYLE,
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
                    text: 'Бакалавр',
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
            ],
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

module.exports = { HEADER };
