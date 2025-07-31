# 🩺 Doc-In-A-Box: AI Doctor Assistant via WhatsApp

A full-stack AI-powered medical assistant that helps users receive health advice, medicine reminders, and symptom assessments directly via WhatsApp.

> 💡 Built to support accessible telemedicine in low-resource areas using WhatsApp and OpenAI.

---

## 🔍 Features

- 🤖 AI symptom checker powered by OpenAI + LangChain  
- 💬 WhatsApp bot integration (via Twilio API)  
- 📚 Medical knowledge base with vector search  
- ⏰ Medicine schedule tracking & reminders  
- 📊 Admin dashboard for monitoring patients and analytics  

---

## 🧱 Tech Stack

| Frontend                               | Backend             | AI                    | Infra                       |
|----------------------------------------|---------------------|------------------------|-----------------------------|
| React (Vite + Tailwind + ShadCN UI)    | FastAPI (Python 3.10) | OpenAI GPT-4, LangChain | Twilio API, SQLite, GitHub |

---

## 🗂️ Project Structure
/frontend
│
├── /src
│ ├── /pages # Dashboard, Conversations, Knowledge Base
│ ├── /components # UI components (cards, buttons, inputs)
│ └── ...
│
/backend
│
├── main.py # FastAPI app entry
├── whatsapp.py # Twilio webhook endpoint
├── ai_agent.py # LLM-based diagnosis handler
└── db.py # SQLite-based patient + medicine tracker


## 🛠️ How to Run This Locally
### 🖼 Frontend (React + Vite)

```bash
git clone https://github.com/divyateja2219/doc-in-a-box-ai.git
cd doc-in-a-box-ai
npm install
npm run dev

⚙️ Backend (FastAPI)
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn main:app --reload

🌐 Deployment
Frontend can be deployed to Vercel, Netlify, or GitHub Pages
Backend can run on Render, Railway, or Replit
Database: Use SQLite for local development, or PostgreSQL for production
Domain: Connect a custom domain with HTTPS using Render/Vercel or Cloudflare

📸 Screenshots
✅ Dashboard


💊 Knowledge Base


💬 WhatsApp Conversation Monitor


✨ Credits
Built with 💙 by Erugadinlla Divya Teja


