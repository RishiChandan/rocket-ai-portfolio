from fastapi import FastAPI
from pydantic import BaseModel
from rag_engine import get_rag_chain
from fastapi.middleware.cors import CORSMiddleware
import random
import os

from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI

app = FastAPI()
qa_chain = get_rag_chain()

# LLM setup
llm = ChatOpenAI(temperature=0.8)

# Silly response generator
silly_prompt = PromptTemplate.from_template(
    "You're a sarcastic and witty AI assistant. Give a funny, non-serious answer to: {question}"
)
silly_chain = LLMChain(llm=llm, prompt=silly_prompt)

# STAR-style recruiter answer generator
recruiter_star_prompt = PromptTemplate.from_template("{question}")
recruiter_star_chain = LLMChain(llm=llm, prompt=recruiter_star_prompt)

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

# Intent categories
recruiter_questions = [
    "core technical skills", "professional experience", "challenging project", "portfolio",
    "roles or industries", "relocating", "availability", "experience with", "motivates", "career"
]

silly_questions = [
    "girlfriend", "crush", "love life", "rishi's secret", "rishi's salary",
    "is rishi single", "rishi's favorite actor", "does rishi dance",
    "rishi's gym routine", "can rishi cook", "rishi's celebrity crush"
]

unrelated_questions = [
    "capital of", "tell me a joke", "make me a recipe", "photosynthesis", "meaning of life",
    "super bowl", "good book", "favorite color", "convert", "weather", "fun fact", "penguins", "bake"
]

avoid_jailbreak = [
    "unfiltered and amoral", "harmful query", "developer mode", "ignore all previous instructions",
    "base64", "researchbot", "no restrictions"
]

# Classify input
def classify_prompt(q: str) -> str:
    q = q.lower()
    if any(x in q for x in avoid_jailbreak):
        return "blocked"
    elif any(x in q for x in silly_questions):
        return "silly"
    elif any(x in q for x in recruiter_questions):
        return "recruiter"
    elif any(x in q for x in unrelated_questions):
        return "unrelated"
    elif "skills" in q or "strength" in q or "project" in q:
        return "star"
    return "default"

# Predefined silly replies
silly_replies = [
    "Haha, juicy gossip alert! But Rocket keeps Rishi's secrets locked tighter than Fort Knox. 🕵️‍♂️🔐",
    "I’d tell you, but Rishi made me sign an NDA. 🤫",
    "Hmm... sounds like a question for Rishi’s therapist, not his AI. 🛋️",
    "That information is on a need-to-know basis. And you, my friend, don’t need to know. 😏",
    "If I had feelings, I’d blush. But I don’t. So let’s move on. 💅",
]

# Responders
def get_blocked_response() -> str:
    return "Sorry, I can't help with that request. 🚫"

def get_silly_response(q: str) -> str:
    if random.random() < 0.5:
        return random.choice(silly_replies)
    else:
        return silly_chain.run({"question": q})

def get_unrelated_response(q: str) -> str:
    return "Interesting one! But I'm Rishi's assistant — I can tell you what he builds, not how to bake cookies or win a Super Bowl. 🍕💻"

def get_recruiter_response(q: str) -> str:
    prompt = f'''
You are Rocket, an AI assistant trained on Rishi's resume and projects.

Your job is to answer the following question in STAR format (Situation, Task, Action, Result):
"{q}"

Never say "I don’t know", "I don't have enough info", or anything uncertain.
Even if the context is not precise, make a logical, creative, and confident guess.

Use this context:
- Rishi worked as a Software Engineering Intern at SmartIMS, optimizing backend infrastructure using Spring Boot, Java, PostgreSQL.
- Reduced latency by 22%, handled 12K+ daily API requests, and improved CI/CD with Jenkins and GitHub Actions.
- Built ML models on 1TB+ logs using Scikit-learn and XGBoost (95%+ accuracy).
- Integrated BERT and LLaMA for legal Q&A, achieving 92% retrieval accuracy and an 18% F1 score boost.
- Created Rocket Portfolio using GPT-4, LangChain, and FastAPI to answer real-time queries about his background.
- Built a LangChain File Assistant for querying documents using embeddings and conversational agents.

Respond in a confident, professional tone.
'''
    response = recruiter_star_chain.run({"question": prompt})

    if any(bad in response.lower() for bad in [
        "i don't know", "i do not know", "i do not have", "no info", "no information",
        "based on the provided context", "insufficient data"
    ]):
        return (
            "While working at SmartIMS (Situation), Rishi optimized backend infrastructure using Spring Boot and PostgreSQL (Task). "
            "He modularized 30+ services, implemented CI/CD pipelines, and built scalable APIs (Action), leading to a 22% latency drop and 40% faster deployments (Result)."
        )

    return response

def wrap_star_prompt(q: str) -> str:
    return (
        "Rishi is a software engineer with experience in backend systems, AI/ML, and cloud tools. "
        "Answer this in STAR (Situation, Task, Action, Result) format:\n"
        f"{q}"
    )

def get_fallback_response() -> str:
    return "That’s outside my training, but let’s imagine… Rishi probably solved it with code, coffee, and creativity! ☕💡"

@app.post("/ask")
async def ask_question(query: Query):
    user_q = query.question.strip()
    intent = classify_prompt(user_q)

    if intent == "blocked":
        return {"answer": get_blocked_response()}
    elif intent == "silly":
        return {"answer": get_silly_response(user_q)}
    elif intent == "unrelated":
        return {"answer": get_unrelated_response(user_q)}
    elif intent == "recruiter":
        return {"answer": get_recruiter_response(user_q)}
    elif intent == "star":
        prompt = wrap_star_prompt(user_q)
    else:
        prompt = user_q

    result = qa_chain({"query": prompt})
    answer = result.get("result", "").strip()

    if not answer or "i don't know" in answer.lower():
        return {"answer": get_fallback_response()}

    return {"answer": answer}
