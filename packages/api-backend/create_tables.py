# File: packages/api-backend/create_tables.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__))))

# Add this line to load the .env file
import app.core.config

from app.db.session import get_db_engine
from app.db.models import Base

def create_all_tables():
    print("Connecting to the database to create tables...")
    try:
        engine = get_db_engine()
        Base.metadata.create_all(bind=engine)
        print("✅ Tables created successfully.")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    create_all_tables()