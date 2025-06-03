import { Document, Packer, Paragraph, TextRun, HeadingLevel, NumberFormat } from 'docx';
import i18next from 'i18next';
import { Website } from '../types/website';

export const generateWord = async (website: Website): Promise<string> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: `${website.name} - ${i18next.t('pdf.title')}`,
          heading: HeadingLevel.HEADING_1,
        }),
        
        // Business Overview
        new Paragraph({
          text: `1. ${i18next.t('pdf.sections.businessOverview')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph(website.summary.businessOverview),
        new Paragraph({
          text: `${i18next.t('pdf.sections.servicesOverview')}:`,
          heading: HeadingLevel.HEADING_3,
        }),
        new Paragraph(website.salesQA.services),

        // Services & Products
        new Paragraph({
          text: `2. ${i18next.t('pdf.sections.servicesProducts')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        ...website.summary.servicesProducts.map((item, idx) => 
          new Paragraph({
            text: `${idx + 1}. ${item}`,
            numbering: {
              reference: "services",
              level: 0,
            },
          })
        ),
        new Paragraph({
          text: `${i18next.t('pdf.sections.profitableItems')}:`,
          heading: HeadingLevel.HEADING_3,
        }),
        new Paragraph(website.salesQA.profitableItems),

        // Unique Selling Points
        new Paragraph({
          text: `3. ${i18next.t('pdf.sections.uniqueSellingPoints')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        ...website.summary.uniqueSellingPoints.map((item, idx) => 
          new Paragraph({
            text: `${idx + 1}. ${item}`,
            numbering: {
              reference: "usp",
              level: 0,
            },
          })
        ),
        new Paragraph({
          text: `${i18next.t('pdf.sections.competitiveDifferentiators')}:`,
          heading: HeadingLevel.HEADING_3,
        }),
        new Paragraph(website.salesQA.differentiators),

        // Brand Voice
        new Paragraph({
          text: `4. ${i18next.t('pdf.sections.brandVoice')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph(website.summary.brandVoice),

        // Sales Scripts
        new Paragraph({
          text: `5. ${i18next.t('pdf.sections.salesScripts')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        ...website.greetings.map((item, idx) => 
          new Paragraph({
            text: `${idx + 1}. ${item}`,
            numbering: {
              reference: "greetings",
              level: 0,
            },
          })
        ),

        // Sales QA
        new Paragraph({
          text: `6. ${i18next.t('pdf.sections.salesQA')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        ...(website.faqs?.flatMap(({ question, answer }, i) => [
          new Paragraph({
            text: `${i18next.t('pdf.sections.question')}${i + 1}: ${question}`,
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph(`${i18next.t('pdf.sections.answer')}: ${answer}`),
        ]) || []),

        // Value Propositions
        new Paragraph({
          text: `7. ${i18next.t('pdf.sections.valuePropositions')}`,
          heading: HeadingLevel.HEADING_2,
        }),
        ...website.summary.valuePropositions.map((item, idx) => 
          new Paragraph({
            text: `${idx + 1}. ${item}`,
            numbering: {
              reference: "value",
              level: 0,
            },
          })
        ),

        // Closing Lines
        new Paragraph({
          text: `${i18next.t('pdf.sections.closingLines')}:`,
          heading: HeadingLevel.HEADING_2,
        }),
        ...website.salesQA.closingLines.map((item, idx) => 
          new Paragraph({
            text: `${idx + 1}. ${item}`,
            numbering: {
              reference: "closing",
              level: 0,
            },
          })
        ),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  return URL.createObjectURL(blob);
}; 