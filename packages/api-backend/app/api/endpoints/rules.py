# File: packages/api-backend/app/api/endpoints/rules.py
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import models
from app.api.endpoints.auth import get_db
from app.api.endpoints.api_key import get_current_user
from app.schemas import BusinessRuleCreate, BusinessRuleResponse

router = APIRouter()

@router.post("/rules", response_model=BusinessRuleResponse)
def create_rule(
    rule: BusinessRuleCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Creates a new business rule for the authenticated user."""
    new_rule = models.BusinessRule(**rule.model_dump(), user_id=current_user.id)
    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)
    return new_rule

@router.get("/rules", response_model=List[BusinessRuleResponse])
def get_rules(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Lists all business rules for the authenticated user."""
    return db.query(models.BusinessRule).filter(models.BusinessRule.user_id == current_user.id).all()