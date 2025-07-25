from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, validator
from rag_engine import get_rag_chain
import time
import logging
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Creative Portfolio RAG API",
    description="AI-powered portfolio assistant with personality!",
    version="2.0.0"
)

# Initialize RAG engine once at startup for efficiency
rag_engine = None

@app.on_event("startup")
async def startup_event():
    """Initialize RAG engine on startup"""
    global rag_engine
    try:
        rag_engine = get_rag_chain()
        logger.info("RAG engine initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize RAG engine: {e}")
        raise

# CORS middleware with better configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "https://yourwebsite.com"  # Add your production domain
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str
    
    @validator('question')
    def validate_question(cls, v):
        if not v or not v.strip():
            raise ValueError('Question cannot be empty')
        if len(v) > 500:  # Prevent extremely long questions
            raise ValueError('Question too long (max 500 characters)')
        return v.strip()

class HealthResponse(BaseModel):
    status: str
    timestamp: float
    details: Optional[dict] = None

@app.get("/", response_model=dict)
async def root():
    """Root endpoint with API info"""
    return {
        "message": "Creative Portfolio RAG API is running! 🚀",
        "version": "2.0.0",
        "endpoints": {
            "/ask": "POST - Ask questions about the portfolio",
            "/health": "GET - Check API health",
            "/refresh-pdf": "POST - Force refresh PDF from Google Drive",
            "/stats": "GET - Get API statistics", 
            "/docs": "GET - API documentation"
        }
    }

@app.post("/ask", response_model=dict)
async def ask_question(query: Query, request: Request):
    """Enhanced question endpoint with better error handling and logging"""
    start_time = time.time()
    client_ip = request.client.host
    
    try:
        if not rag_engine:
            raise HTTPException(
                status_code=503, 
                detail="RAG engine not initialized. Please try again later."
            )
        
        logger.info(f"Question from {client_ip}: {query.question[:100]}...")
        
        # Get answer from RAG engine
        answer = rag_engine.ask(query.question)
        
        processing_time = round(time.time() - start_time, 3)
        
        logger.info(f"Response time: {processing_time}s")
        
        return {
            "answer": answer,
            "processing_time_seconds": processing_time,
            "timestamp": time.time()
        }
        
    except ValueError as ve:
        logger.warning(f"Validation error from {client_ip}: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    
    except Exception as e:
        logger.error(f"Error processing question from {client_ip}: {e}")
        
        # Return a fun error message instead of generic error
        fun_error_responses = [
            "🤖 My AI brain had a hiccup! Try asking about professional experience?",
            "🎭 Plot twist: Something went sideways! Ask me about skills instead?",
            "🚀 Houston, we have a temporary glitch! Fire away with work-related questions!",
        ]
        import random
        
        return JSONResponse(
            status_code=200,  # Return 200 but with error message
            content={
                "answer": random.choice(fun_error_responses),
                "processing_time_seconds": round(time.time() - start_time, 3),
                "timestamp": time.time(),
                "note": "There was a technical issue, but I'm still here to help!"
            }
        )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    try:
        if not rag_engine:
            return HealthResponse(
                status="unhealthy",
                timestamp=time.time(),
                details={"error": "RAG engine not initialized"}
            )
        
        health_info = rag_engine.health_check()
        
        return HealthResponse(
            status=health_info["status"],
            timestamp=time.time(),
            details=health_info
        )
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return HealthResponse(
            status="unhealthy",
            timestamp=time.time(),
            details={"error": str(e)}
        )

@app.post("/refresh-pdf", response_model=dict)
async def refresh_pdf():
    """Force refresh the PDF from Google Drive and rebuild vectorstore"""
    try:
        if not rag_engine:
            raise HTTPException(
                status_code=503,
                detail="RAG engine not initialized"
            )
        
        result = rag_engine.refresh_pdf()
        
        if result["status"] == "success":
            logger.info("PDF refreshed successfully")
            return {
                "message": result["message"],
                "pdf_path": result.get("pdf_path"),
                "timestamp": time.time()
            }
        else:
            logger.error(f"PDF refresh failed: {result['message']}")
            raise HTTPException(status_code=500, detail=result["message"])
            
    except Exception as e:
        logger.error(f"Error refreshing PDF: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to refresh PDF: {str(e)}"
        )

@app.get("/stats", response_model=dict)
async def get_stats():
    """Get basic API statistics"""
    return {
        "status": "running",
        "rag_engine_loaded": rag_engine is not None,
        "timestamp": time.time(),
        "message": "Ready to answer questions about the portfolio! 🎯"
    }

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "message": "🎪 You've wandered into the digital void! Try /ask or /health endpoints instead.",
            "available_endpoints": ["/", "/ask", "/health", "/refresh-pdf", "/stats", "/docs"]
        }
    )

@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "message": "🤖 My circuits are having a moment! Please try again in a few seconds.",
            "suggestion": "If this persists, the human behind this portfolio should check the logs!"
        }
    )