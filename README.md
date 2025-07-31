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
```
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
```

## 🛠️ How to Run This Locally

### 🖼 Frontend (React + Vite)

```bash
git clone https://github.com/divyateja2219/doc-in-a-box-ai.git
cd doc-in-a-box-ai
npm install
npm run dev
```


### ⚙️ Backend (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

### Deployment
🌐 Deployment
Frontend can be deployed to Vercel, Netlify, or GitHub Pages
Backend can run on Render, Railway, or Replit
Database: Use SQLite for local development, or PostgreSQL for production
Domain: Connect a custom domain with HTTPS using Render/Vercel or Cloudflare

## ScreenShots
📸 Screenshots
✅ Dashboard
<img width="1086" height="839" alt="Dashboard" src="https://github.com/user-attachments/assets/39f241b5-d47d-4385-8420-61c13a39819d" />
💊 Knowledge Base
<img width="1075" height="845" alt="Knowledge Base" src="https://github.com/user-attachments/assets/64f9974c-570d-41bc-b1d0-077e539a1a88" />
💬 WhatsApp Conversation Monitor
<img width="1096" height="841" alt="WhatsApp Monitor" src="https://github.com/user-attachments/assets/4d4e7b7a-109f-4054-8239-64fc080830e6" />

## ✨ Credits
Built with 💙 by Erugadinlla Divya Teja
