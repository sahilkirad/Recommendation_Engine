# File: packages/api-backend/app/db/session.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def get_db_engine():
    """Creates a database engine instance using the environment variable."""
    DATABASE_URL = os.environ.get("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not set")

    return create_engine(DATABASE_URL, pool_pre_ping=True)

# Create the engine instance
engine = get_db_engine()

# Create the SessionLocal class, which will be a factory for new sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)