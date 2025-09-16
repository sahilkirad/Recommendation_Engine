# File: packages/api-backend/app/services/cold_start_model.py
import numpy as np


class ColdStartModel:
    def __init__(self, catalog: list):
        self.catalog = catalog
        self.popular_items = self._train_and_get_popular()

    def _train_and_get_popular(self):
        # For a demo, we'll just find the most frequent items.
        # In a real app, this would be a more complex model training process.
        print("💡 Training cold start model...")
        # Let's pretend these are the most popular items based on historical data
        popular_ids = ["SHOE-045", "JKT-007", "TSHIRT-005", "PANT-002"]
        print("✅ Cold start model ready.")
        return popular_ids

    def get_recommendations(self, num_recs: int = 4):
        """Returns a list of the most popular items for new users."""
        return self.popular_items[:num_recs]

# We will create an instance of this model when our app starts.