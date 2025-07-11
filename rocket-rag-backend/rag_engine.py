import os
from langchain_community.document_loaders import OnlinePDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

def get_rag_chain():
    persist_directory = "./chroma_db"
    embeddings = OpenAIEmbeddings()

    if os.path.exists(persist_directory) and os.listdir(persist_directory):
        # ✅ Use existing vectorstore
        db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    else:
        # 🆕 Rebuild vectorstore if missing
        loader = OnlinePDFLoader("https://drive.google.com/uc?export=download&id=1k5jrMVpWK2XfQ7bscIWiCD7j67fzAJXu")
        documents = loader.load()
        db = Chroma.from_documents(documents, embeddings, persist_directory=persist_directory)
        db.persist()

    retriever = db.as_retriever()
    llm = ChatOpenAI(model="gpt-4.1-nano", temperature=0)

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=False
    )

    return qa_chain
