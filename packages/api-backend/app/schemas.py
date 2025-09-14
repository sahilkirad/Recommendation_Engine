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