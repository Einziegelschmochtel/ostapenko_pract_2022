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

const FOOTER = [
  new Table({
    borders: {
      left: { style: BorderStyle.NONE },
      top: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    margins: { top: 500 },
    columnWidths: [5005, 4005],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Розглянуто та затвердженно на засіданні кафедри комп'ютерних наук та математики`,
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Протокол № 6 від 8 травня 2019 року`,
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
                    text: `Завідувач кафедри`,
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Литвин О.С. ______________`,
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
                    text: `Екзаменатор`,
                    ...DEFAULT_TEXT_STYLE,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Кучаковська Г.А. ______________`,
                    ...DEFAULT_TEXT_STYLE,
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

module.exports = { FOOTER };
