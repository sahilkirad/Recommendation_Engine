# File: packages/api-backend/app/core/redis_client.py
import redis

# Create a reusable Redis connection client
# This will be imported by other parts of our application
redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

print("✅ Connected to Redis")