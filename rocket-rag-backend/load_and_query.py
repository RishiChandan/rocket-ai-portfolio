from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
import os

# Load environment variables
load_dotenv()

# Load and split your resume
loader = PyPDFLoader("resume.pdf")
documents = loader.load()

# Use OpenAI embeddings
embeddings = OpenAIEmbeddings()
db = Chroma.from_documents(documents, embeddings, persist_directory="./chroma_db")
db.persist()

# Setup retriever and GPT-4.1 (Turbo)
retriever = db.as_retriever()
llm = ChatOpenAI(model="gpt-4-1106-preview", temperature=0)

# Retrieval chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=False
)

# Console test loop
while True:
    query = input("\nAsk Rocket: ")
    if query.lower() in ['exit', 'quit']:
        break
    result = qa_chain({"query": query})
    print(f"\nRocket: {result['result']}")
