from fastapi import FastAPI
from pydantic import BaseModel
from rag_engine import get_rag_chain
from fastapi.middleware.cors import CORSMiddleware
import random

from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence

app = FastAPI()
qa_chain = get_rag_chain()

# LLM setup
llm = ChatOpenAI(temperature=0.8)

# Prompt templates
silly_prompt = PromptTemplate.from_template(
    "You're a sarcastic and witty AI assistant. Give a funny, non-serious answer to: {question}"
)
recruiter_prompt = PromptTemplate.from_template("{question}")

# Runnable chains
silly_chain = silly_prompt | llm
recruiter_star_chain = recruiter_prompt | llm

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
    "roles or industries", "relocating", "availability", "experience with", "motivates", "career",
    "my skills", "my projects", "what have you done", "rishi’s strengths"
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

# Intent classifier
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

# Fun fallback messages
silly_replies = [
    "Haha, juicy gossip alert! But Rocket keeps Rishi's secrets locked tighter than Fort Knox. 🕵️‍♂️🔐",
    "I’d tell you, but Rishi made me sign an NDA. 🤫",
    "Hmm... sounds like a question for Rishi’s therapist, not his AI. 🛋️",
    "That information is on a need-to-know basis. And you, my friend, don’t need to know. 😏",
    "If I had feelings, I’d blush. But I don’t. So let’s move on. 💅",
]

# Smart guess fallback
def get_unknown_trivia_response(q: str) -> str:
    return f"I'm not sure, but if I had to guess... Rishi probably {'does' if random.random() > 0.5 else 'does not'} {q.split()[-1]}. 🤔"

# Responders
def get_blocked_response() -> str:
    return "Sorry, I can't help with that request. 🚫"

def get_silly_response(q: str) -> str:
    if random.random() < 0.5:
        return random.choice(silly_replies)
    return silly_chain.invoke({"question": q})

def get_unrelated_response(q: str) -> str:
    return "Interesting one! But I'm Rishi's assistant — I can tell you what he builds, not how to bake cookies or win a Super Bowl. 🍕💻"

def get_recruiter_response(q: str) -> str:
    prompt = f'''
You are Rocket, an AI assistant trained on Rishi's resume and personal portfolio.

Your job is to answer the following question in two parts:
1. Summarize Rishi's core technical skills in a clean list.
2. Provide one or more STAR-format (Situation, Task, Action, Result) examples to demonstrate how those skills were used in real experiences.

Here is the user question:
"{q}"

NEVER say "I don't know", "not enough context", or anything vague. Be confident and creative.

Use this accurate context from Rishi's resume:
- Rishi was a Software Engineering Intern at SmartIMS. He engineered backend infrastructure using Spring Boot and PostgreSQL.
- Reduced latency by 22%, handled 12K+ requests/day, and improved CI/CD pipelines via Jenkins and GitHub Actions.
- Built ML models using Scikit-learn and XGBoost on 1TB+ logs with 95%+ accuracy.
- Integrated BERT and LLaMA for legal Q&A (92% retrieval accuracy, +18% F1).
- Created Rocket Portfolio (a GPT-4-powered site using LangChain, RAG, and FastAPI) to answer questions about his experience.
- Developed LangChain File Assistant to query documents with embeddings and AI tools.
- Completed projects: Stock Price Prediction (LSTM), Eigenfaces with OpenCV, Deep Graph Adversarial Learning using PyTorch.

Respond in the following format:
- Core Skills: <bulleted list>
- STAR Example(s): <formatted story>
'''
    response = recruiter_star_chain.invoke({"question": prompt}).strip()

    if any(x in response.lower() for x in [
        "i don't know", "i do not know", "not sure", "no information",
        "based on available data", "cannot determine", "as an ai", "insufficient context"
    ]):
        return (
            "**Core Skills:**\n"
            "- Java, Spring Boot, PostgreSQL, REST APIs\n"
            "- Python, Scikit-learn, XGBoost, LSTM, PyTorch\n"
            "- LangChain, FastAPI, GPT-4, Chroma, RAG\n"
            "- Docker, Jenkins, GitHub Actions, CI/CD\n\n"
            "**STAR Example:**\n"
            "While working at SmartIMS (Situation), Rishi built and optimized backend APIs using Spring Boot (Task). "
            "He modularized 30+ services and tuned database queries in PostgreSQL (Action), reducing latency by 22% and speeding up deployments by 40% (Result)."
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

# Main logic
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

    if not answer or any(x in answer.lower() for x in [
        "i don't know", "i do not know", "not sure", "no information",
        "based on available data", "cannot determine", "as an ai", "insufficient context"
    ]):
        return {"answer": get_unknown_trivia_response(user_q)}

    return {"answer": answer}
