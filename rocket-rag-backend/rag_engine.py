import os
import logging
import requests
from functools import lru_cache
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# PDF Configuration
PDF_URL = "https://drive.google.com/uc?export=download&id=1k5jrMVpWK2XfQ7bscIWiCD7j67fzAJXu"
PDF_PATH = "downloaded.pdf"

# Set up logging for debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedRAGEngine:
    def __init__(self):
        self.persist_directory = "./chroma_db"
        self.embeddings = None
        self.db = None
        self.retriever = None
        self.llm = None
        self.qa_chain = None
        self._initialize()
    
    def _initialize(self):
        """Initialize the RAG components"""
        try:
            # Cache embeddings instance
            self.embeddings = OpenAIEmbeddings()
            
            # Initialize vectorstore
            self._setup_vectorstore()
            
            # Initialize LLM with optimized settings
            self.llm = ChatOpenAI(
                model="gpt-4.1-nano",  # Fixed model name
                temperature=0.3,  # Slightly higher for creative responses
                max_tokens=500,   # Limit response length for efficiency
                request_timeout=30
            )
            
            # Setup enhanced QA chain with custom prompt
            self._setup_qa_chain()
            
            logger.info("RAG Engine initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing RAG Engine: {e}")
            raise
    
    def _download_pdf(self) -> str:
        """Download PDF from Google Drive URL if not exists locally"""
        if os.path.exists(PDF_PATH):
            logger.info(f"PDF already exists at {PDF_PATH}")
            return PDF_PATH
        
        try:
            logger.info(f"Downloading PDF from {PDF_URL}...")
            response = requests.get(PDF_URL, timeout=30)
            response.raise_for_status()
            
            with open(PDF_PATH, 'wb') as f:
                f.write(response.content)
            
            logger.info(f"PDF downloaded successfully to {PDF_PATH}")
            return PDF_PATH
            
        except requests.RequestException as e:
            logger.error(f"Failed to download PDF: {e}")
            # Fallback to local resume.pdf if download fails
            if os.path.exists("resume.pdf"):
                logger.info("Falling back to local resume.pdf")
                return "resume.pdf"
            else:
                raise Exception(f"Could not download PDF and no local fallback found: {e}")

    def _setup_vectorstore(self):
        """Setup or load existing vectorstore"""
        if os.path.exists(self.persist_directory) and os.listdir(self.persist_directory):
            logger.info("Loading existing vectorstore...")
            self.db = Chroma(
                persist_directory=self.persist_directory, 
                embedding_function=self.embeddings
            )
        else:
            logger.info("Creating new vectorstore...")
            
            # Download PDF if needed
            pdf_path = self._download_pdf()
            
            loader = PyPDFLoader(pdf_path)
            documents = loader.load()
            
            # Split documents into smaller chunks for better retrieval
            from langchain.text_splitter import RecursiveCharacterTextSplitter
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
                length_function=len,
            )
            splits = text_splitter.split_documents(documents)
            
            self.db = Chroma.from_documents(
                splits, 
                self.embeddings, 
                persist_directory=self.persist_directory
            )
            self.db.persist()
            
            logger.info(f"Vectorstore created with {len(splits)} document chunks")
        
        # Setup retriever with optimized search parameters
        self.retriever = self.db.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={
                "k": 3,  # Reduce from default to speed up
                "score_threshold": 0.5
            }
        )
    
    def _setup_qa_chain(self):
        """Setup QA chain with enhanced prompt template"""
        
        # Custom prompt template for handling both relevant and irrelevant questions
        custom_prompt = PromptTemplate(
            template="""You are a creative and witty AI assistant representing someone's portfolio. Your primary job is to provide information about the person based on their resume and professional background.

Context from resume: {context}

Human Question: {question}

Instructions:
1. If the question is about the person's professional background, skills, experience, education, or career - answer professionally using the context provided.

2. If the question is completely unrelated to the person (like random facts, silly questions, hypotheticals, etc.), respond in a creative, humorous, and engaging way while gently steering back to the portfolio. Be playful but not rude.

3. Never say "I don't know" - always provide some form of entertaining response.

4. Keep responses concise but engaging (under 150 words).

5. If the context doesn't contain relevant information for a professional question, be creative about how you acknowledge this while staying in character.

Answer:""",
            input_variables=["context", "question"]
        )
        
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.retriever,
            return_source_documents=False,
            chain_type_kwargs={"prompt": custom_prompt}
        )
    
    def _process_query(self, question: str) -> str:
        """Process query without caching - saves memory"""
        try:
            result = self.qa_chain({"query": question})
            return result["result"]
        except Exception as e:
            logger.error(f"Error processing query: {e}")
            return self._get_fallback_response(question)
    
    def _get_fallback_response(self, question: str) -> str:
        """Provide a fallback response if something goes wrong"""
        silly_responses = [
            "🤖 My circuits are having a creative moment! Try asking me about professional experience instead?",
            "🎭 Plot twist: I'm temporarily channeling my inner comedian instead of accessing the resume database!",
            "🚀 Houston, we have a... actually, we don't have a problem! Just ask me about skills or experience!",
            "🎪 Welcome to the AI circus! For my next trick, I'll answer questions about work experience!",
            "🎲 Rolling the dice of randomness here! Want to hear about actual qualifications instead?"
        ]
        import random
        return random.choice(silly_responses)
    
    def ask(self, question: str) -> str:
        """Main method to ask questions"""
        if not question or not question.strip():
            return "🤔 Silent treatment? I prefer chatty conversations! Ask me about professional background!"
        
        # Clean the question
        question = question.strip()
        
        # Use direct query processing (no caching)
        return self._process_query(question)
    
    def refresh_pdf(self) -> dict:
        """Force download and refresh the PDF and rebuild vectorstore"""
        try:
            # Remove existing PDF if it exists
            if os.path.exists(PDF_PATH):
                os.remove(PDF_PATH)
                logger.info(f"Removed existing PDF: {PDF_PATH}")
            
            # Remove existing vectorstore to force rebuild
            if os.path.exists(self.persist_directory):
                import shutil
                shutil.rmtree(self.persist_directory)
                logger.info(f"Removed existing vectorstore: {self.persist_directory}")
            
            # Re-initialize everything
            self._setup_vectorstore()
            
            return {
                "status": "success",
                "message": "PDF refreshed and vectorstore rebuilt successfully",
                "pdf_path": PDF_PATH
            }
            
        except Exception as e:
            logger.error(f"Error refreshing PDF: {e}")
            return {
                "status": "error",
                "message": f"Failed to refresh PDF: {str(e)}"
            }
        """Check if all components are working"""
        try:
            test_response = self.ask("What is your name?")
            return {
                "status": "healthy",
                "vectorstore_loaded": self.db is not None,
                "retriever_ready": self.retriever is not None,
                "llm_ready": self.llm is not None,
                "test_response_length": len(test_response),
                "pdf_path": PDF_PATH,
                "pdf_exists": os.path.exists(PDF_PATH),
                "vectorstore_path": self.persist_directory
            }
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e)
            }

# Global instance for reuse
_rag_engine_instance = None

def get_rag_chain():
    """Get or create RAG engine instance (singleton pattern for efficiency)"""
    global _rag_engine_instance
    if _rag_engine_instance is None:
        _rag_engine_instance = EnhancedRAGEngine()
    return _rag_engine_instance