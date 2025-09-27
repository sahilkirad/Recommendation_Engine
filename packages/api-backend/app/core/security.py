# File: packages/api-backend/app/core/security.py
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from app.db import models
from app.db.session import SessionLocal

# --- Hashing (already exists) ---
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# --- API Key Generation (NEW) ---
def generate_api_key() -> str:
    """Generates a secure, random API key."""
    return f"nexus_live_{secrets.token_urlsafe(32)}"


# --- JWT Token Creation (NEW) ---
# These should be in your .env file in a real production app
SECRET_KEY = "your-super-secret-key-for-jwt" # Replace with a long, random string
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Creates a new JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(email: str):
    """Fetches a user from the database by email."""
    db = SessionLocal()
    try:
        return db.query(models.User).filter(models.User.email == email).first()
    finally:
        db.close()