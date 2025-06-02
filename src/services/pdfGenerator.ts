import { jsPDF } from 'jspdf';
import i18next from 'i18next';
import { Website } from '../types/website';

import notoSansJPRegular from '../assets/fonts/notoSansJPRegular';
import notoSansJPBold from '../assets/fonts/notoSansJPBold';

export const generatePDF = async (website: Website): Promise<string> => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  
  /* ────────────── 1.  Register Unicode font ────────────── */
  doc.addFileToVFS('NotoSansJP-Regular.ttf', notoSansJPRegular);
  doc.addFont      ('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
  
  doc.addFileToVFS('NotoSansJP-Bold.ttf',    notoSansJPBold);
  doc.addFont      ('NotoSansJP-Bold.ttf',    'NotoSansJP', 'bold');
  doc.setFont('NotoSansJP', 'normal');
  
  console.log("font list :::: ", doc.getFontList());
  /* ────────────── 2.  Helpers ────────────── */
  const pageWidth  = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin     = 20;
  const lineHeight = 14;             // a bit taller for CJK
  let   y          = margin;

  const baseFont = i18next.language === 'ja' ? 'NotoSansJP' : 'helvetica';

  const checkNewPage = (height: number) => {
    if (y + height > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addText = (
    text: string,
    fontSize = 12,
    bold = false,
  ) => {
    doc.setFont(baseFont, bold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);

    const split = doc.splitTextToSize(text, pageWidth - 2 * margin);
    const blockHeight = split.length * lineHeight;

    checkNewPage(blockHeight);
    doc.text(split, margin, y);
    y += blockHeight + 4;
  };

  const addList = (items: string[]) =>
    items.forEach((item, idx) =>
      addText(`${idx + 1}. ${item}`)
    );

  const t = i18next.t;

  /* ────────────── 3.  Content ────────────── */
  addText(`${website.name} - ${t('pdf.title')}`, 20, true);      y += 6;

  addText(`1. ${t('pdf.sections.businessOverview')}`, 16, true);
  addText(website.summary.businessOverview);
  addText(`${t('pdf.sections.servicesOverview')}:`, 14, true);
  addText(website.salesQA.services);                            y += 10;

  addText(`2. ${t('pdf.sections.servicesProducts')}`, 16, true);
  addList(website.summary.servicesProducts);
  addText(`${t('pdf.sections.profitableItems')}:`, 14, true);
  addText(website.salesQA.profitableItems);                     y += 10;

  addText(`3. ${t('pdf.sections.uniqueSellingPoints')}`, 16, true);
  addList(website.summary.uniqueSellingPoints);
  addText(`${t('pdf.sections.competitiveDifferentiators')}:`, 14, true);
  addText(website.salesQA.differentiators);                     y += 10;

  addText(`4. ${t('pdf.sections.brandVoice')}`, 16, true);
  addText(website.summary.brandVoice);                          y += 10;

  addText(`5. ${t('pdf.sections.salesScripts')}`, 16, true);
  addList(website.greetings);                                   y += 10;

  addText(`6. ${t('pdf.sections.salesQA')}`, 16, true);         y += 6;
  website.faqs?.forEach(({ question, answer }, i) => {
    addText(`${t('pdf.sections.question')}${i + 1}: ${question}`, 12, true);
    addText(`${t('pdf.sections.answer')}: ${answer}`);
  });                                                           y += 10;

  addText(`7. ${t('pdf.sections.valuePropositions')}`, 16, true);
  addList(website.summary.valuePropositions);

  addText(`${t('pdf.sections.closingLines')}:`, 16, true);
  addList(website.salesQA.closingLines);

  /* ────────────── 4.  Return Blob URL ────────────── */
  return URL.createObjectURL(doc.output('blob'));
};