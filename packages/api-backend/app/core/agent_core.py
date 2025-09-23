import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
load_dotenv()

MODEL_NAME = os.environ.get("MODEL_NAME", "gemini-2.0-flash")
print(f"✅ Using Model: {MODEL_NAME}")

# --- Initialize the LLM ---
# We now use the client for Cohere
llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=os.environ.get("GOOGLE_API_KEY"),
    temperature=0.1,
    convert_system_message_to_human=True
)


# --- Define the Prompt Template ---
# This is the instruction manual for our AI agent.
# It's a dynamic template that will be filled with real user data.


# ... (imports and llm initialization are the same)

# File: packages/api-backend/app/core/agent_core.py

# ... (imports and llm initialization are the same)

recommendation_prompt = ChatPromptTemplate.from_messages([
    ("system", """
You are a world-class e-commerce stylist and data scientist. Your goal is to provide insightful recommendations that strictly follow all business rules.

**THOUGHT PROCESS:**
1.  First, analyze the **Active Business Rules**. These are the most important instructions and take top priority.
2.  Next, analyze the user's session history to understand their interests.
3.  Brainstorm recommendations that satisfy BOTH the user's interest AND the business rules.
4.  Select the best 3-4 recommendations and write a compelling reason for each.
5.  Generate a dynamic headline for the recommendation set.

**RULES:**
1.  Your FINAL response MUST be a single, minified JSON object.
2.  You MUST strictly follow and prioritize the **Active Business Rules** provided.
3.  Do NOT include your thought process or any text outside of the final JSON object.
4.  If you cannot make a good recommendation, return an empty list: {{"headline": "Fresh Finds For You", "recommendations": []}}.

**OUTPUT FORMAT:**
{{"headline": "Your dynamic headline here.", "recommendations": [{{"item_id": "PRODUCT_ID", "reason": "A concise, insightful reason."}}]}}
"""),
    ("human", """
        **Active Business Rules:**
        {business_rules}

        **User History:**
        {session_history}

        **Product Catalog:**
        {product_catalog}

        Please generate the JSON output now, strictly following the business rules.
    """)
])

# ... (the rest of the file is the same)

# Combine the prompt and the LLM into a runnable chain
# This is the "brain" that our LangGraph agent will use.
recommendation_chain = recommendation_prompt | llm