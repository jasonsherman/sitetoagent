import { jsPDF } from 'jspdf';
import { Website } from '../types/website';

export const generatePDF = async (website: Website): Promise<string> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;
  const lineHeight = 7;

  // Helper function to check if we need a new page
  const checkNewPage = (height: number) => {
    if (y + height > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const splitText = doc.splitTextToSize(text, pageWidth - (2 * margin));
    const textHeight = splitText.length * lineHeight;
    
    checkNewPage(textHeight);
    doc.text(splitText, margin, y);
    y += textHeight + 5;
  };

  // Helper function to add list items
  const addListItems = (items: string[]) => {
    items.forEach((item, index) => {
      const text = `${index + 1}. ${item}`;
      const splitText = doc.splitTextToSize(text, pageWidth - (2 * margin));
      const textHeight = splitText.length * lineHeight;
      
      checkNewPage(textHeight);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(splitText, margin, y);
      y += textHeight + 5;
    });
  };

  // Title
  addText(`${website.name} - Knowledge Base`, 20, true);
  y += 10;

  // 1. Business Overview
  addText('1. Business Overview & Company Information', 16, true);
  addText(website.summary.businessOverview);
  addText('Services Overview:', 14, true);
  addText(website.salesQA.services);
  y += 10;

  // 2. Services & Products
  addText('2. Services & Products Catalog', 16, true);
  addListItems(website.summary.servicesProducts);
  addText('Most Profitable Items:', 14, true);
  addText(website.salesQA.profitableItems);
  y += 10;

  // 3. Unique Selling Points
  addText('3. Unique Selling Points & Competitive Advantages', 16, true);
  addListItems(website.summary.uniqueSellingPoints);
  addText('Competitive Differentiators:', 14, true);
  addText(website.salesQA.differentiators);
  y += 10;

  // 4. Brand Voice
  addText('4. Brand Voice Guidelines & Communication Style', 16, true);
  addText(website.summary.brandVoice);
  y += 10;

  // 5. Sales Scripts
  addText('5. Sales Scripts & Greeting Templates', 16, true);
  addListItems(website.greetings);
  y += 10;

  // 6. Sales Q&A
  addText('6. Common Sales Questions & Strategic Answers', 16, true);
  y += 10;
  
  // Add FAQs
  if (website.faqs && website.faqs.length > 0) {
    website.faqs.forEach((faq, index) => {
      addText(`Q${index + 1}: ${faq.question}`, 12, true);
      addText(`A: ${faq.answer}`);
      y += 5;
    });
  }
  y += 10;

  // 7. Value Propositions
  addText('7. Value Propositions & Customer Benefits', 16, true);
  addListItems(website.summary.valuePropositions);

  // Closing Lines
  addText('Effective Closing Lines:', 16, true);
  addListItems(website.salesQA.closingLines);

  // Generate blob URL
  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}; 