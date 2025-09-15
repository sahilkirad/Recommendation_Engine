# File: packages/api-backend/app/api/endpoints/api_key.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.db import models
from app.db.session import SessionLocal
from app.core.security import SECRET_KEY, ALGORITHM, generate_api_key, get_user

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Dependency to get the current authenticated user from a token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user(email=email)
    if user is None:
        raise credentials_exception
    return user


@router.get("/api-key", response_model=str)
def get_or_create_api_key(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """
    Retrieves the user's API key. If it doesn't exist, it creates one.
    """
    # Check if a key already exists for this user
    api_key_obj = db.query(models.ApiKey).filter(models.ApiKey.user_id == current_user.id).first()

    if api_key_obj:
        return api_key_obj.key

    # If no key exists, create one
    new_key_str = generate_api_key()
    new_api_key = models.ApiKey(key=new_key_str, user_id=current_user.id)
    db.add(new_api_key)
    db.commit()
    db.refresh(new_api_key)

    return new_api_key.key