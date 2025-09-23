from fastapi import Depends, HTTPException, Security
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import Session
from starlette import status
from app.db import models
from app.api.endpoints.auth import get_db

API_KEY_HEADER = APIKeyHeader(name="X-API-Key")

def get_api_key(
    api_key_header: str = Security(API_KEY_HEADER), db: Session = Depends(get_db)
) -> models.ApiKey:
    """
    Dependency that requires an API key and validates it.
    Returns the ApiKey database object if valid.
    """
    api_key = db.query(models.ApiKey).filter(models.ApiKey.key == api_key_header).first()
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key",
        )
    return api_key