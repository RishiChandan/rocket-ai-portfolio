# 🚀 Rocket AI Portfolio Assistant

![Render](https://img.shields.io/badge/Backend-Render-blue?logo=render)  
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)

Your personal AI-powered portfolio assistant built with **GPT-4**, **LangChain**, **ChromaDB**, and a full **RAG (Retrieval-Augmented Generation)** pipeline. Ask *Rocket* about your resume, background, or experience — it fetches answers straight from your actual resume using intelligent retrieval!

---

## 🌐 Live Demo

- [https://rocket-ai-portfolio.vercel.app/]
  
---

## ✨ Features

- 🤖 **Chat-based AI assistant** powered by GPT-4
- 📄 Parses resume PDF from Google Drive
- 🧠 ChromaDB vector store for persistent embeddings
- 🔍 LangChain `RetrievalQA` for smart answers
- ⚙️ Auto-rebuilds vectorstore on first deploy
- 🎨 Typing animation + dark/light mode toggle
- 🧩 Input field with glow on focus
- 🧠 Answers questions based on actual resume content

---

## 🧰 Tech Stack

### 🔙 Backend (`rocket-rag-backend`)
- `FastAPI` + `Uvicorn`
- `LangChain`, `LangChain-Community`, `LangChain-OpenAI`
- `OpenAIEmbeddings`, `ChatOpenAI`
- `ChromaDB` for vector storage
- `PyPDFLoader` for light PDF parsing
- Hosted on **Render**

### 🌐 Frontend (`rocket-frontend`)
- `React.js` + `Tailwind CSS`
- Typing animation (`react-simple-typewriter`)
- Dark/Light mode toggle
- Input glow effect
- Hosted on **Vercel**

---

## 📄 Resume Integration

- 📎 Source: [Google Drive PDF](https://drive.google.com/file/d/1k5jrMVpWK2XfQ7bscIWiCD7j67fzAJXu/view)
- 🔍 Loaded via `PyPDFLoader` from public Google Drive link
- 🧠 Embedded using OpenAI + stored in ChromaDB
- ⚡ Automatically persists to avoid repeated loads

---

## 🔐 Environment Variables

### ✅ Backend (Render)
| Key              | Description                    |
|------------------|--------------------------------|
| `OPENAI_API_KEY` | OpenAI API Key for GPT-4 usage |

### ✅ Frontend (Vercel)
| Key                  | Description                         |
|----------------------|-------------------------------------|
| `REACT_APP_API_URL`  | Backend endpoint for `/ask` route   |

---

## 🛠 How to Run Locally

### 🔙 Backend
```bash
cd rocket-rag-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
