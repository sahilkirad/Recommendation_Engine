from pydantic import BaseModel
from typing import Optional, Dict, Any

class TrackingEvent(BaseModel):
    """
    Defines the structure for an incoming tracking event from the client's site.
    """
    visitor_id: str
    event: str
    data: Optional[Dict[str, Any]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "visitor_id": "vis-user-12345",
                "event": "view_product",
                "data": {"product_id": "SHOE-045"}
            }
        }

# Add this class to your schemas.py file

class RecommendationRequest(BaseModel):
    """
    Defines the structure for a recommendation request.
    """
    visitor_id: str

class UserCreate(BaseModel):
    """Schema for creating a new user."""
    email: str
    password: str

class UserResponse(BaseModel):
    """Schema for returning user information (without the password)."""
    id: int
    email: str

    class Config:
        orm_mode = True # This allows the model to be created from a database object

class Token(BaseModel):
    """Schema for the JWT access token."""
    access_token: str
    token_type: str

class BusinessRuleBase(BaseModel):
    name: str
    condition_field: str
    condition_value: str
    action_type: str
    action_value: int

class BusinessRuleCreate(BusinessRuleBase):
    pass

class BusinessRuleResponse(BusinessRuleBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    id: str
    name: str
    category: str

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    class Config:
        from_attributes = True