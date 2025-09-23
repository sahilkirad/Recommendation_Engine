# File: packages/api-backend/app/api/endpoints/recommend.py
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import RecommendationRequest
from app.core.redis_client import redis_client
from app.core.agent_core import recommendation_chain
from app.db import models
from app.api.dependencies import get_api_key
from app.api.endpoints.auth import get_db

router = APIRouter()

# For the demo, we'll use a simple in-memory catalog.
PRODUCT_CATALOG = [
    {"id": "JKT-007", "name": "Blue Denim Jacket", "category": "Jackets"},
    {"id": "SHOE-045", "name": "Classic Leather Sneakers", "category": "Footwear"},
    {"id": "PANT-002", "name": "Slim Fit Chinos", "category": "Pants"},
    {"id": "TSHIRT-005", "name": "V-Neck Cotton T-Shirt", "category": "T-Shirts"},
    {"id": "JKT-009", "name": "Black Bomber Jacket", "category": "Jackets"},
]

@router.post("/recommend")
async def get_recommendations(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
    api_key: models.ApiKey = Depends(get_api_key)
):
    """
    Fetches session history and uses the AI agent to generate recommendations.
    """
    redis_key = f"session:{request.visitor_id}"
    session_history_raw = redis_client.lrange(redis_key, 0, -1)

    # --- UPDATED COLD START LOGIC ---
    if not session_history_raw:
        print("❄️ New user detected. Providing static fallback recommendations.")
        # Return a simple, static list for new users
        fallback_recs = {
            "headline": "Popular This Week",
            "recommendations": [
                {"item_id": "SHOE-045", "reason": "A timeless and versatile bestseller."},
                {"item_id": "JKT-007", "reason": "A popular choice to get you started."}
            ]
        }
        return fallback_recs
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

    # Invoke the AI agent with all necessary context
    ai_response_content = recommendation_chain.invoke({
        "session_history": "\n".join(session_history_raw),
        "product_catalog": json.dumps(PRODUCT_CATALOG),
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