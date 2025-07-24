from fastapi import FastAPI
from pydantic import BaseModel
from rag_engine import get_rag_chain
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
qa_chain = get_rag_chain()

# CORS settings: allow local + vercel domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://rocket-ai-portfolio.vercel.app"  # ⬅️ Replace with your actual domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(query: Query):
    result = qa_chain({"query": query.question})
    return {"answer": result["result"]}
