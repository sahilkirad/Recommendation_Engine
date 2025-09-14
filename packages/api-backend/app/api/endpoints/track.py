from fastapi import APIRouter
from app.schemas import TrackingEvent
from app.core.redis_client import redis_client # Import our new Redis client

router = APIRouter()

@router.post("/track")
async def track_event(event: TrackingEvent):
    """
    Receives a tracking event and stores it in Redis.
    """
    # Create a unique key for the user's session list
    redis_key = f"session:{event.visitor_id}"
    
    # Convert the event data to a JSON string to store it
    event_json = event.model_dump_json()
    
    # Add the new event to the end of the list for this user
    redis_client.rpush(redis_key, event_json)
    
    # For a demo, it's good practice to set an expiration time
    # This session will be automatically deleted after 2 hours (7200 seconds)
    redis_client.expire(redis_key, 7200)

    print(f"✅ Event for {event.visitor_id} stored in Redis.")

    return {"status": "ok", "message": "Event successfully stored"}