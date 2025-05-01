# SiteToAgent

**AI-Powered Sales Agent Generator & Knowledge Base Builder**

SiteToAgent transforms any business website into a complete AI sales agent training kit. It scrapes your site, summarizes your business, generates a downloadable knowledge base PDF, creates branded greeting scripts, and answers foundational sales questions—perfect for chatbot onboarding or sales team training.

## Features

- **Website Scraper:** Crawls homepage and key subpages, extracting core content and sales copy.
- **Content Summarizer:** Uses AI to summarize business, extract services, detect tone, and highlight differentiators.
- **Greeting Script Generator:** Produces 5 unique, branded greetings in your site's voice.
- **Sales Q&A Generator:** Auto-generates answers to 4 foundational sales questions.
- **Knowledge Base PDF:** Compiles all insights into a clean, downloadable PDF.
- **Export Options:** Download as PDF, TXT/Markdown, or JSON for chatbot integration.

## Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js (Puppeteer/Playwright for scraping)
- **AI Layer:** Llama API (or similar)
- **PDF Generation:** jsPDF
- **Hosting:** Render

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/jasonsherman/sitetoagent.git
   cd sitetoagent
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

*Made with ❤️ by [Jason Sherman](https://jasonsherman.org) and contributors.* 