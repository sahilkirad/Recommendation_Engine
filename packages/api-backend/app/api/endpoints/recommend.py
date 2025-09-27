# File: packages/api-backend/app/api/endpoints/recommend.py
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import RecommendationRequest, ProductResponse
from app.core.redis_client import redis_client
from app.core.agent_core import recommendation_chain
from app.db import models
from app.api.dependencies import get_api_key
from app.api.endpoints.auth import get_db
from app.services.cold_start_model import ColdStartModel
router = APIRouter()

# # For the demo, we'll use a simple in-memory catalog.
# PRODUCT_CATALOG = [
#     {"id": "JKT-007", "name": "Blue Denim Jacket", "category": "Jackets"},
#     {"id": "SHOE-045", "name": "Classic Leather Sneakers", "category": "Footwear"},
#     {"id": "PANT-002", "name": "Slim Fit Chinos", "category": "Pants"},
#     {"id": "TSHIRT-005", "name": "V-Neck Cotton T-Shirt", "category": "T-Shirts"},
#     {"id": "JKT-009", "name": "Black Bomber Jacket", "category": "Jackets"},
# ]
cold_start_model = ColdStartModel()
@router.post("/recommend")
async def get_recommendations(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
    api_key: models.ApiKey = Depends(get_api_key)
):
    """
    Fetches session history and uses the AI agent and the dynamic, user-specific
    product catalog from the database to generate recommendations.
    """
    # --- 1. FETCH THE DYNAMIC CATALOG FROM THE DATABASE ---
    user_catalog = db.query(models.Product).filter(models.Product.user_id == api_key.user_id).all()
    if not user_catalog:
        raise HTTPException(status_code=404, detail="No product catalog found. Please upload a catalog.")

    # Convert SQLAlchemy objects to dictionaries for the AI prompt
    product_catalog_dict = [ProductResponse.from_orm(p).model_dump() for p in user_catalog]
    # --------------------------------------------------------
    redis_key = f"session:{request.visitor_id}"
    session_history_raw = redis_client.lrange(redis_key, 0, -1)

    # --- UPDATED COLD START LOGIC ---
    if not session_history_raw:
        print("❄️ New user detected. Providing static fallback recommendations.")
        # Get recommendations from the user's own catalog
        recs = cold_start_model.get_recommendations(catalog=product_catalog_dict)
        # Return a simple, static list for new users
        response_data = {
            "headline": "Popular This Week",
            "recommendations": [
                {"item_id": item['id'], "reason": "A popular choice to get you started."}
                for item in recs
            ]
        }
        return response_data
    # --- END OF UPDATE ---

    print("🧠 Known user. Using AI agent for reasoning.")
    
    # Fetch and format active business rules
    rules = db.query(models.BusinessRule).filter(
        models.BusinessRule.user_id == api_key.user_id,
        models.BusinessRule.is_active == True
    ).all()
    rules_str = "\n".join([f"- {r.name}: If a product's {r.condition_field} is '{r.condition_value}', {r.action_type} its score by {r.action_value}%." for r in rules])
    if not rules:
        rules_str = "No active business rules."

    # Invoke the AI agent with the DYNAMIC catalog
    ai_response_content = recommendation_chain.invoke({
        "session_history": "\n".join(session_history_raw),
        "product_catalog": json.dumps(product_catalog_dict),
        "business_rules": rules_str
    }).content
    
    print(f"DEBUG: Raw AI Response:\n{ai_response_content}")

    try:
        cleaned_content = ai_response_content.strip()
        if cleaned_content.startswith("```json"):
            cleaned_content = cleaned_content[7:-4]
        recommendations = json.loads(cleaned_content)
    except json.JSONDecodeError:
        print("ERROR: AI response was not valid JSON.")
        raise HTTPException(status_code=500, detail="AI failed to generate a valid JSON response.")

    print("✅ AI Agent generated recommendations.")
    return recommendations