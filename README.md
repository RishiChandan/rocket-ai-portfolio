project: Rocket AI Portfolio

live_links:
  frontend: https://rocket-ai-portfolio.vercel.app

description: >
  Rocket is a personal AI-powered portfolio assistant built using GPT-4, LangChain, and a full RAG pipeline.
  Visitors can chat with Rocket to ask questions about your resume and background. It answers contextually using actual resume content.

technologies:
  backend:
    - FastAPI
    - Uvicorn
    - Python 3.10+
    - LangChain
    - LangChain-Community
    - LangChain-OpenAI
    - ChromaDB
    - PyPDFLoader
    - OpenAIEmbeddings
    - Render (hosting)
  frontend:
    - React.js
    - Tailwind CSS
    - Typing animation
    - Input glow effect
    - Dark/Light mode toggle
    - Vercel (hosting)
  RAG_pipeline:
    - Document loading from Google Drive (via PyPDFLoader)
    - Embedding generation (OpenAI)
    - Vector store (ChromaDB)
    - Retrieval-Augmented Generation (LangChain RetrievalQA)
    - ChatOpenAI (GPT-4) answering with context

env_variables:
  backend:
    - OPENAI_API_KEY (stored securely on Render)
  frontend:
    - REACT_APP_API_URL=https://rocket-ai-portfolio.onrender.com

resume_integration:
  source: Google Drive
  link_used: https://drive.google.com/uc?export=download&id=1k5jrMVpWK2XfQ7bscIWiCD7j67fzAJXu
  method: PyPDFLoader dynamically pulls and parses the PDF, converts it to text, embeds it, and saves it into Chroma vector DB.

features:
  - Chat-based AI assistant that answers questions based on your resume
  - GPT-4 model integration via LangChain
  - Dynamic PDF-to-vectorstore pipeline
  - Live frontend and backend deployment
  - Smart CORS setup for secure API access
  - Smooth dark/light theme and interactive design
  - Typing animation and stylized input field for UX polish

deployment:
  vercel: Frontend hosted and deployed instantly
  render: Backend hosted with auto-rebuild on push

how_to_run_locally:
  backend:
    - cd rocket-rag-backend
    - python -m venv venv
    - source venv/bin/activate
    - pip install -r requirements.txt
    - uvicorn main:app --reload
  frontend:
    - cd rocket-frontend
    - npm install
    - npm run dev

improvements_todo:
  - Voice-controlled interface with "Rocket" wake word
  - Upload your own resume directly from UI
  - Multi-turn memory chat system
  - Admin dashboard and query analytics

why_this_project: >
  Rocket is more than a portfolio — it's a smart AI-powered digital identity.
  It demonstrates full-stack AI engineering, RAG architecture, modern deployment, and solid UX design.

contact:
  linkedin: https://www.linkedin.com/in/rishichandan/
  github: https://github.com/RishiChandan
  email: your.email@example.com

credits:
  built_by: Rishi Chandan
  powered_by: GPT-4, LangChain, and Rocket
