import os
from langchain_community.document_loaders import OnlinePDFLoader
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from dotenv import load_dotenv



def get_rag_chain():
    persist_directory = "./chroma_db"
    embeddings = OpenAIEmbeddings()

    # Check if the Chroma DB already exists
    if os.path.exists(persist_directory) and os.listdir(persist_directory):
        db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    else:
        # Load the resume from Google Drive
        resume_url = "https://drive.google.com/uc?export=download&id=1k5jrMVpWK2XfQ7bscIWiCD7j67fzAJXu"
        loader = OnlinePDFLoader(resume_url)
        documents = loader.load()

        # Create vector DB
        db = Chroma.from_documents(documents, embeddings, persist_directory=persist_directory)
        db.persist()

    retriever = db.as_retriever()
    llm = ChatOpenAI(model="gpt-4.0", temperature=0)

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=False
    )

    return qa_chain
