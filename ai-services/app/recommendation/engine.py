import numpy as np
from sklearn.decomposition import NMF
from sklearn.metrics.pairwise import cosine_similarity
from collections import defaultdict


class RecommendationEngine:
    def __init__(self):
        self.model = NMF(n_components=5, init='random', random_state=42, max_iter=500)
        self.user_item_matrix = None
        self.user_map = {}
        self.item_map = {}
        self.reverse_item_map = {}

    def fit(self, interactions: list[dict]):
        users = list(set(i['user_id'] for i in interactions))
        items = list(set(i['destination'] for i in interactions))

        self.user_map = {u: idx for idx, u in enumerate(users)}
        self.item_map = {d: idx for idx, d in enumerate(items)}
        self.reverse_item_map = {idx: d for d, idx in self.item_map.items()}

        self.user_item_matrix = np.zeros((len(users), len(items)))

        for interaction in interactions:
            uid = self.user_map[interaction['user_id']]
            iid = self.item_map[interaction['destination']]
            rating = interaction.get('rating', 1.0)
            action_weight = {
                'view': 1.0,
                'save': 2.0,
                'book': 3.0,
                'review': 4.0,
            }.get(interaction.get('action_type', 'view'), 1.0)
            self.user_item_matrix[uid][iid] += rating * action_weight

        if self.user_item_matrix.sum() > 0:
            self.model.fit(self.user_item_matrix)

    def get_recommendations(self, user_id: str, n: int = 10) -> list[dict]:
        if user_id not in self.user_map:
            return self._get_popular_destinations(n)

        user_idx = self.user_map[user_id]
        user_vector = self.user_item_matrix[user_idx].reshape(1, -1)

        if hasattr(self.model, 'transform'):
            user_features = self.model.transform(user_vector)
            reconstructed = np.dot(user_features, self.model.components_)
        else:
            reconstructed = np.dot(user_vector, np.eye(self.user_item_matrix.shape[1]))

        scores = reconstructed.flatten()
        top_indices = np.argsort(scores)[::-1][:n]

        recommendations = []
        for idx in top_indices:
            if idx in self.reverse_item_map and scores[idx] > 0:
                recommendations.append({
                    'destination': self.reverse_item_map[idx],
                    'score': float(min(scores[idx] / max(scores.max(), 1), 1.0)),
                })

        return recommendations

    def _get_popular_destinations(self, n: int) -> list[dict]:
        if self.user_item_matrix is None:
            return []

        popularity = self.user_item_matrix.sum(axis=0)
        top_indices = np.argsort(popularity)[::-1][:n]

        recommendations = []
        for idx in top_indices:
            if idx in self.reverse_item_map:
                max_pop = max(popularity.max(), 1)
                recommendations.append({
                    'destination': self.reverse_item_map[idx],
                    'score': float(popularity[idx] / max_pop),
                })

        return recommendations

    def get_similar_users(self, user_id: str, n: int = 5) -> list[dict]:
        if user_id not in self.user_map or self.user_item_matrix is None:
            return []

        user_idx = self.user_map[user_id]
        user_vector = self.user_item_matrix[user_idx].reshape(1, -1)
        similarities = cosine_similarity(user_vector, self.user_item_matrix)[0]

        similar_indices = np.argsort(similarities)[::-1][1:n + 1]

        reverse_user_map = {idx: uid for uid, idx in self.user_map.items()}
        return [
            {'user_id': reverse_user_map[idx], 'similarity': float(similarities[idx])}
            for idx in similar_indices if idx in reverse_user_map
        ]
