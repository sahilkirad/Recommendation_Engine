# File: packages/api-backend/app/main.py

# --- 1. Path setup (ensures imports work) ---
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# --- 2. Load environment variables FIRST ---
import app.core.config

# --- 3. Import all necessary modules ---
from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.endpoints import track, recommend,auth, api_key, rules, catalog
from app.db.session import get_db_engine
from fastapi.middleware.cors import CORSMiddleware

# --- 4. Define the Lifespan event manager ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages application startup and shutdown events.
    """
    print("🚀 Entering application lifespan...")
    try:
        # Create the database engine
        engine = get_db_engine()
        # Test the connection
        with engine.connect() as connection:
            print("✅ Successfully connected to the database.")
    except Exception as e:
        print(f"❌ CRITICAL: Failed to connect to the database. Error: {e}")
    
    yield
    
    print("👋 Shutting down API.")

# --- 5. Create and configure the main FastAPI app ---
app = FastAPI(
    title="NexusAI Agent API",
    version="0.1.0",
    description="The core reasoning and recommendation engine for NexusAI.",
    lifespan=lifespan  # <-- This is the crucial line that registers the lifespan
)
origins = [
    "http://localhost",
    "http://localhost:3000", # Your platform frontend
    "http://localhost:3001", # Your demo site
    "http://127.0.0.1:3000", # Alternative for platform
    "http://127.0.0.1:3001", # Alternative for demo site
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# --- 6. Include the API routers ---
app.include_router(track.router, prefix="/api/v1")
app.include_router(recommend.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1") # Add this line
app.include_router(api_key.router, prefix="/api/v1")
app.include_router(rules.router, prefix="/api/v1") # Add this line
app.include_router(catalog.router, prefix="/api/v1")
# --- 7. Define the root endpoint ---
@app.get("/")
def read_root():
    """A simple health check endpoint."""
    return {"status": "ok", "message": "NexusAI Agent is running"}