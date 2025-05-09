# 🤖 SiteToAgent – AI-Powered Sales Agent Generator & Knowledge Base Builder

Paste a website URL → Scrape & Summarize → Generate Sales Scripts & Q&A → Download a Branded PDF.

---

## ✨ Project Overview

SiteToAgent is a microservice that transforms any business website into a complete AI sales agent training kit. Instantly scrape, analyze, and summarize a site, then generate:
- A downloadable knowledge base PDF
- 5 branded greeting scripts
- 4 foundational sales Q&A answers

Perfect for chatbot onboarding, sales team training, or rapid business analysis.

---

## 💡 Why I Built This

Most businesses struggle to quickly train AI sales agents on their unique value. I wanted a **simple**, **open-source**, **AI-powered** tool that:
- Automates knowledge extraction from any website
- Delivers ready-to-use sales content
- Makes onboarding and sales enablement effortless

---

## ⚙️ Key Features

- 🌐 Paste any business website URL
- 🤖 AI-powered content summarization (business, services, tone, USPs)
- 💬 Generates 5 branded greeting scripts
- ❓ Auto-answers 4 foundational sales questions
- 📄 Exports a clean, professional knowledge base PDF
- 📦 Download as PDF, TXT/Markdown, or JSON (for chatbot integration)
- 🛡️ No long-term storage: Data is processed in-memory only

---

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Python Flask
- **AI Layer:** OpenRouter API
- **PDF Generation:** jsPDF
- **Clipboard:** Native JS / react-copy-to-clipboard
- **Hosting:** Render

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/jasonsherman/sitetoagent.git
cd sitetoagent
```

### 2. Backend Setup

#### Create Environment File
Create a `.env` file in the root directory and add your OpenRouter API key:
```bash
OPENROUTER_API_KEY=your_api_key_here
```

#### Set Up Python Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
pip install -r requirements.txt
```

#### Run the Backend Server
```bash
python run.py
```
The backend server will start at `http://localhost:5000`. Keep this running in a separate terminal.

### 3. Frontend Setup

#### Update Environment Configuration
Add the backend URL to your `.env` file:
```bash
VITE_BACKEND_URL=http://localhost:5000
```

#### Install Frontend Dependencies
```bash
cd ..  # Return to project root
npm install
```

#### Development Mode
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

#### Production Build
To build and run the frontend in production mode:

1. Build the production bundle:
```bash
npm run build
```

2. Preview the production build locally:
```bash
npm run preview
```

3. For production deployment, serve the contents of the `dist` directory using a static file server like Nginx, Apache, or a cloud hosting service.


#### Frontend Production Setup
1. Build the frontend:
```bash
npm run build
```

2. Serve the production build using one of these methods:

Using `serve` (simple option):
```bash
# Install serve globally
npm install -g serve

# Serve the production build
serve -s dist -l 3000
```

Using `nginx` (recommended for production):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/your/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Privacy and Security

- No user data or website content is stored long-term.
- All processing is done in-memory for privacy.
- No analytics or tracking by default.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributions Welcome!

Open issues, suggest features, or submit pull requests. Let's make AI-powered sales enablement accessible to everyone!

*Made with ❤️ by [Jason Sherman](https://jasonsherman.org) and contributors.* 