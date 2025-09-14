import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_cohere import ChatCohere # IMPORT THIS

load_dotenv()

MODEL_NAME = os.environ.get("MODEL_NAME", "command-r")
print(f"✅ Using Model: {MODEL_NAME}")

# --- Initialize the LLM ---
# We now use the client for Cohere
llm = ChatCohere(
    model=MODEL_NAME,
    cohere_api_key=os.environ.get("COHERE_API_KEY"),
    temperature=0.1
)


# --- Define the Prompt Template ---
# This is the instruction manual for our AI agent.
# It's a dynamic template that will be filled with real user data.
# File: packages/api-backend/app/core/agent_core.py

# ... (imports and llm initialization are the same)

# File: packages/api-backend/app/core/agent_core.py

# ... (imports and llm initialization are the same)

recommendation_prompt = ChatPromptTemplate.from_messages([
    ("system", """
You are a hyper-efficient, machine-like JSON API. Your sole purpose is to return personalized product recommendations.

**RULES:**
1. Your entire response MUST be a single, minified JSON object.
2. Do NOT include any introductory text, closing text, explanations, or markdown formatting like ```json.
3. The JSON object must strictly adhere to the format specified below.
4. The "reason" should be a concise, compelling sentence.
5. If the user's history is irrelevant or you cannot make at least one good recommendation based on the catalog, you MUST return an empty list: {{"recommendations": []}}.

**OUTPUT FORMAT:**
{{"recommendations": [{{"item_id": "PRODUCT_ID", "reason": "A concise reason."}}]}}
"""),
    ("human", """
---
**EXAMPLE START**

**User History:**
{{"visitor_id":"vis-user-789","event":"view_product","data":{{"product_id":"SHOE-045"}}}}

**Product Catalog:**
[{{"item_id": "SHOE-045", "name": "Classic Leather Sneakers"}}, {{"item_id": "PANT-002", "name": "Slim Fit Chinos"}}, {{"item_id": "SOCK-001", "name": "Ankle Socks (3-Pack)"}}]

**Expected JSON Output:**
{{"recommendations": [{{"item_id": "PANT-002", "reason": "These Slim Fit Chinos are a popular choice to pair with classic sneakers."}}, {{"item_id": "SOCK-001", "reason": "Complete your look with these comfortable ankle socks."}}]}}

**EXAMPLE END**
---
**TASK START**

**User History:**
{session_history}

**Product Catalog:**
{product_catalog}

**TASK END**
---
Please generate the JSON output for the above task now.
    """)
])

# ... (the rest of the file is the same)


# Combine the prompt and the LLM into a runnable chain
# This is the "brain" that our LangGraph agent will use.
recommendation_chain = recommendation_prompt | llm