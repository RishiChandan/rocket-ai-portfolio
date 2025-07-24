import os
import requests

from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

PDF_URL = "https://drive.google.com/uc?export=download&id=1k5jrMVpWK2XfQ7bscIWiCD7j67fzAJXu"
PDF_PATH = "downloaded.pdf"

def download_pdf():
    if not os.path.exists(PDF_PATH):
        response = requests.get(PDF_URL)
        with open(PDF_PATH, "wb") as f:
            f.write(response.content)

def get_rag_chain():
    persist_directory = "./chroma_db"
    embeddings = OpenAIEmbeddings()

    if os.path.exists(persist_directory) and os.listdir(persist_directory):
        db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    else:
        download_pdf()
        loader = PyPDFLoader(PDF_PATH)
        documents = loader.load()
        db = Chroma.from_documents(documents, embeddings, persist_directory=persist_directory)
        db.persist()

    retriever = db.as_retriever()
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=False
    )
