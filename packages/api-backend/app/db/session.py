# File: packages/api-backend/app/db/session.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# REMOVE the global engine and SessionLocal creation from here.

def get_db_engine():
    """Creates a database engine instance using the environment variable."""
    DATABASE_URL = os.environ.get("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not set")
    
    # pool_pre_ping=True helps handle dropped connections
    return create_engine(DATABASE_URL, pool_pre_ping=True)

# We can define a function to get a session if needed later
# def get_db_session():
#     engine = get_db_engine()
#     SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#     return SessionLocal()