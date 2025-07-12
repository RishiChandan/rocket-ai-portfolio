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
- Hosted on **Vercel**

---

## 📄 Resume Integration

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
```


## 🧠 RAG Pipeline Overview

1. 📄 PDF loaded from a **public Google Drive** link using `PyPDFLoader`
2. ✂️ Text is split into document chunks
3. 🧠 Embeddings are generated using `OpenAIEmbeddings`
4. 💾 Vectors are stored in **ChromaDB** (with persistent directory)
5. 🔍 On user query, relevant chunks are retrieved
6. 🤖 `ChatOpenAI` (GPT-4) answers using the retrieved context via `RetrievalQA`

---

## 👨‍💻 About the Creator

**Rishi Chandan**  
🛠️ Passionate about AI x UX x Products  
🔗 [LinkedIn](https://www.linkedin.com/in/rishichandan/) • 💻 [GitHub](https://github.com/RishiChandan)

> Building meaningful products with code, creativity, and coffee ☕.

---

## 🙌 Credits

- 🤖 Powered by **[OpenAI GPT-4](https://platform.openai.com/)** for LLM intelligence  
- 🧠 Built using **[LangChain](https://www.langchain.com/)** and `RetrievalQA`  
- 📎 Document parsed via `PyPDFLoader` from `langchain_community`  
- 💾 Vector storage handled by **[ChromaDB](https://www.trychroma.com/)**  
- 🚀 Hosted with ❤️ on **[Render](https://render.com/)** (Backend) and **[Vercel](https://vercel.com/)** (Frontend)

> **Crafted to make portfolios intelligent. Inspired by the power of AI.**
