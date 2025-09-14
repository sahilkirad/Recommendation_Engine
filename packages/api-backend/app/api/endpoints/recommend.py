import json
from fastapi import APIRouter, HTTPException
from app.schemas import RecommendationRequest
from app.core.redis_client import redis_client
from app.core.agent_core import recommendation_chain # Import our new AI chain

router = APIRouter()

# For the demo, we'll use a simple in-memory catalog.
# In a real app, this would come from our PostgreSQL database.
PRODUCT_CATALOG = [
    {"item_id": "JKT-007", "name": "Blue Denim Jacket", "category": "Jackets"},
    {"item_id": "SHOE-045", "name": "Classic Leather Sneakers", "category": "Footwear"},
    {"item_id": "PANT-002", "name": "Slim Fit Chinos", "category": "Pants"},
    {"item_id": "TSHIRT-005", "name": "V-Neck Cotton T-Shirt", "category": "T-Shirts"},
    {"item_id": "JKT-009", "name": "Black Bomber Jacket", "category": "Jackets"},
]


@router.post("/recommend")
async def get_recommendations(request: RecommendationRequest):
    """
    Fetches session history and uses the LangGraph agent to generate recommendations.
    """
    redis_key = f"session:{request.visitor_id}"
    session_history = redis_client.lrange(redis_key, 0, -1)

    if not session_history:
        # This is where we would call our LightFM model for the cold start
        return {"message": "No session history. Triggering cold start model."}

    ai_response_content = recommendation_chain.invoke({
        "session_history": "\n".join(session_history),
        "product_catalog": json.dumps(PRODUCT_CATALOG)
    }).content
    
    print(f"DEBUG: Raw AI Response:\n{ai_response_content}") # Add this for debugging

    try:
        # Try to parse the JSON
        recommendations = json.loads(ai_response_content)
    except json.JSONDecodeError:
        # If it fails, raise a proper HTTP error
        print("ERROR: AI response was not valid JSON.")
        raise HTTPException(status_code=500, detail="AI failed to generate a valid JSON response.")

    print("✅ AI Agent generated recommendations.")
    return recommendations