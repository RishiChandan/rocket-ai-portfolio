# main.py

from fastapi import FastAPI, Request
from pydantic import BaseModel
from rag_engine import get_rag_chain
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
qa_chain = get_rag_chain()

# Allow frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],# Change to your domain later
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
