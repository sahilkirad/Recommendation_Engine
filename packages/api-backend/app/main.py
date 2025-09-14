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
from app.api.endpoints import track, recommend
from app.db.session import get_db_engine

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

# --- 6. Include the API routers ---
app.include_router(track.router, prefix="/api/v1")
app.include_router(recommend.router, prefix="/api/v1")

# --- 7. Define the root endpoint ---
@app.get("/")
def read_root():
    """A simple health check endpoint."""
    return {"status": "ok", "message": "NexusAI Agent is running"}