import { Website } from '../types/website';

// This simulates API calls to a backend service
export const mockAnalyzeWebsite = async (url: string): Promise<Website> => {
  // In a real app, this would make an API call to your backend
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Get domain name for display
      const domainMatch = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im);
      const domain = domainMatch ? domainMatch[1] : url;
      
      // Mock data - in a real app, this would come from the backend
      const mockResponse: Website = {
        url: url,
        name: domain,
        summary: {
          businessOverview: `${domain} is a leading provider of innovative business solutions designed to help companies streamline operations, boost productivity, and achieve sustainable growth. With a focus on cutting-edge technology and exceptional customer service, they have established themselves as trusted partners for businesses of all sizes.`,
          uniqueSellingPoints: [
            "Proprietary AI-powered analytics platform",
            "24/7 dedicated customer support",
            "Customizable solutions for businesses of all sizes",
            "Industry-leading security protocols",
            "Seamless integration with existing systems"
          ],
          servicesProducts: [
            "Business Intelligence Solutions",
            "Data Analytics Services",
            "Custom Software Development",
            "Cloud Migration & Management",
            "Digital Transformation Consulting"
          ],
          brandVoice: "Professional, knowledgeable, and confident while maintaining a friendly and approachable tone. Uses industry terminology appropriately but explains complex concepts clearly.",
          valuePropositions: [
            "Increase operational efficiency by up to 35%",
            "Reduce IT costs by an average of 28%",
            "Gain actionable insights from your business data",
            "Scale your technology infrastructure seamlessly",
            "Partner with industry experts dedicated to your success"
          ]
        },
        greetings: [
          `Hi there! I'm an AI sales representative for ${domain}. I'd love to show you how our solutions can transform your business operations. What challenges are you currently facing?`,
          `Welcome to ${domain}! I'm here to help you discover how our cutting-edge services can give your business a competitive advantage. Would you like to learn more about our solutions?`,
          `Thanks for your interest in ${domain}. Our team has helped hundreds of businesses like yours achieve remarkable growth. I'd be happy to explain how we can do the same for you.`,
          `Hello from ${domain}! Our mission is to empower businesses with innovative technology solutions. I'm here to answer any questions and help you find the perfect fit for your needs.`,
          `Greetings! I represent ${domain}, where we specialize in transforming business challenges into opportunities for growth. How can I assist you today?`
        ],
        salesQA: {
          services: `${domain} offers a comprehensive suite of business technology solutions, including our flagship Business Intelligence platform, Data Analytics services, Custom Software Development, Cloud Migration & Management, and Digital Transformation Consulting. Each service is customizable to meet the specific needs of your business, whether you're a growing startup or an established enterprise.`,
          differentiators: `Unlike our competitors, ${domain} combines cutting-edge technology with a truly personalized approach. Our proprietary AI analytics platform delivers insights that are 40% more accurate than industry standards. We offer 24/7 dedicated support from real experts, not chatbots. Additionally, our solutions are designed for seamless integration with your existing systems, resulting in faster implementation and ROI. Our client retention rate of 96% speaks to the exceptional value we deliver.`,
          profitableItems: `Our most profitable offerings are our Enterprise Data Analytics packages, Custom Software Development services, and our annual Digital Transformation Consulting retainers. These premium services deliver exceptional value to clients while maintaining healthy profit margins. Our Business Intelligence platform subscriptions at the Professional and Enterprise tiers also contribute significantly to our bottom line, especially when bundled with implementation services.`,
          closingLines: [
            "Based on what you've shared, I'm confident our solution can reduce your operational costs by at least 25% within the first six months.",
            "Many of our clients start seeing positive ROI within just 90 days of implementation. I'd be happy to connect you with a few references who can share their experience.",
            "I understand budget concerns, which is why we offer flexible payment options. We can structure a solution that works with your current financial constraints while still delivering the results you need.",
            "The challenges you're describing are exactly what our platform was designed to solve. I'd like to arrange a personalized demo to show you specifically how it would work for your business.",
            "Let's start with a small pilot project to demonstrate the value. Once you see the results, we can discuss scaling the solution across your organization."
          ]
        }
      };
      
      resolve(mockResponse);
    }, 2000); // Simulate 2 second delay
  });
};

export const generatePDF = async (website: Website): Promise<string> => {
  // In a real app, this would generate a real PDF
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock PDF generation - return a fake blob URL
      resolve("blob:mock-pdf-url");
    }, 1000);
  });
};