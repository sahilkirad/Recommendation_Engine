# File: packages/api-backend/app/services/cold_start_model.py
from sentence_transformers import SentenceTransformer

class ColdStartModel:
    def __init__(self):
        print("💡 Initializing sentence-transformer model for potential use...")
        # This model is loaded once on startup for efficiency.
        # self.model = SentenceTransformer('all-MiniLM-L6-v2')
        print("✅ Cold start model handler ready.")

    def get_recommendations(self, catalog: list, num_recs: int = 4):
        """
        For a true cold start (zero user history), the best strategy is to
        recommend the most popular or featured items. For our demo, we'll
        simply return the first few items from the developer's uploaded catalog.
        """
        return catalog[:num_recs]