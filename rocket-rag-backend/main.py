from fastapi import FastAPI
from pydantic import BaseModel
from rag_engine import get_rag_chain
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
qa_chain = get_rag_chain()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://rocket-ai-portfolio.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str

# Prompt style buckets
silly_keywords = ["girlfriend", "crush", "love", "pet", "salary", "secret", "dating", "funny", "joke", "weird"]
trivia_keywords = ["favorite", "daily routine", "morning", "sleep", "eat", "drink", "watch", "play"]
deep_keywords = ["fear", "dream", "ambition", "purpose", "regret", "emotion", "feeling", "philosophy"]
star_keywords = ["skills", "strength", "project", "experience", "achievement", "accomplishment", "worked on"]

def classify_prompt(q: str) -> str:
    q = q.lower()
    if any(k in q for k in silly_keywords):
        return "silly"
    elif any(k in q for k in trivia_keywords):
        return "trivia"
    elif any(k in q for k in deep_keywords):
        return "deep"
    elif any(k in q for k in star_keywords):
        return "star"
    return "default"

# Response generators
def get_silly_response(q: str) -> str:
    return "Haha, juicy gossip alert! But Rocket keeps Rishi's secrets locked tighter than Fort Knox. 🕵️‍♂️🔐"

def get_trivia_response(q: str) -> str:
    return "Rishi's day probably starts with coffee and ends with debugging bugs that weren't his fault. ☕🐛"

def get_deep_response(q: str) -> str:
    return "That’s a profound one. Rishi believes growth happens just outside the comfort zone — and that code is poetry. ✨"

def wrap_star_prompt(q: str) -> str:
    return f"Please answer using the STAR (Situation, Task, Action, Result) format if applicable:\n{q}"

def get_fallback_response() -> str:
    return "Well, I wasn’t trained for that... but let me take a wild, intelligent guess! 🤖💡 Rishi probably did something cool!"

@app.post("/ask")
async def ask_question(query: Query):
    user_q = query.question.strip()
    intent = classify_prompt(user_q)

    if intent == "silly":
        return {"answer": get_silly_response(user_q)}
    elif intent == "trivia":
        return {"answer": get_trivia_response(user_q)}
    elif intent == "deep":
        return {"answer": get_deep_response(user_q)}
    elif intent == "star":
        prompt = wrap_star_prompt(user_q)
    else:
        prompt = user_q

    # Use RAG pipeline
    result = qa_chain({"query": prompt})
    answer = result.get("result", "").strip()

    if not answer:
        return {"answer": get_fallback_response()}
    
    return {"answer": answer}
