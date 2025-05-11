export interface FAQ {
  question: string;
  answer: string;
}

export interface Website {
  url: string;
  name: string;
  summary: {
    businessOverview: string;
    uniqueSellingPoints: string[];
    servicesProducts: string[];
    brandVoice: string;
    valuePropositions: string[];
  };
  greetings: string[];
  salesQA: {
    services: string;
    differentiators: string;
    profitableItems: string;
    closingLines: string[];
  };
  faqs: FAQ[];
}