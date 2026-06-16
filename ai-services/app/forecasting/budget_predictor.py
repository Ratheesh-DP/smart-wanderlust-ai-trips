import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor


class BudgetPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.is_trained = False
        self.feature_names = [
            'days', 'destination_popularity', 'season_factor',
            'accommodation_level', 'activity_level', 'dining_level',
        ]

    def train(self, X: np.ndarray, y: np.ndarray):
        self.model.fit(X, y)
        self.is_trained = True

    def predict(self, features: dict) -> dict:
        if not self.is_trained:
            return self._default_prediction(features)

        X = np.array([[
            features.get('days', 7),
            features.get('destination_popularity', 0.5),
            features.get('season_factor', 1.0),
            features.get('accommodation_level', 2),
            features.get('activity_level', 2),
            features.get('dining_level', 2),
        ]])

        prediction = self.model.predict(X)[0]

        breakdown = self._calculate_breakdown(prediction, features.get('days', 7))

        return {
            'total_budget': round(prediction, 2),
            'breakdown': breakdown,
            'confidence': 0.75,
            'per_day': round(prediction / max(features.get('days', 1), 1), 2),
        }

    def _default_prediction(self, features: dict) -> dict:
        days = features.get('days', 7)
        destination = features.get('destination', 'unknown')

        base_costs = {
            'budget': 80,
            'mid-range': 150,
            'luxury': 350,
        }
        level = features.get('accommodation_level', 2)
        if level <= 1:
            daily_avg = base_costs['budget']
        elif level <= 3:
            daily_avg = base_costs['mid-range']
        else:
            daily_avg = base_costs['luxury']

        total = daily_avg * days

        breakdown = self._calculate_breakdown(total, days)

        return {
            'total_budget': round(total, 2),
            'breakdown': breakdown,
            'confidence': 0.5,
            'per_day': round(daily_avg, 2),
        }

    def _calculate_breakdown(self, total: float, days: int) -> dict:
        accommodation_pct = 0.35
        food_pct = 0.25
        transport_pct = 0.15
        activities_pct = 0.15
        shopping_pct = 0.05
        misc_pct = 0.05

        return {
            'accommodation': round(total * accommodation_pct, 2),
            'food': round(total * food_pct, 2),
            'transportation': round(total * transport_pct, 2),
            'activities': round(total * activities_pct, 2),
            'shopping': round(total * shopping_pct, 2),
            'miscellaneous': round(total * misc_pct, 2),
        }


class BudgetForecaster:
    def __init__(self):
        self.predictor = BudgetPredictor()
        self._train_default_model()

    def _train_default_model(self):
        np.random.seed(42)
        n_samples = 1000
        X = np.random.rand(n_samples, 6)
        X[:, 0] = np.random.randint(1, 30, n_samples)
        X[:, 1] = np.random.uniform(0.3, 1.0, n_samples)
        X[:, 2] = np.random.uniform(0.8, 1.5, n_samples)
        X[:, 3] = np.random.randint(1, 5, n_samples)
        X[:, 4] = np.random.randint(1, 5, n_samples)
        X[:, 5] = np.random.randint(1, 5, n_samples)

        y = (
            X[:, 0] * 50
            + X[:, 1] * 200
            + X[:, 2] * 100
            + X[:, 3] * 80
            + X[:, 4] * 40
            + X[:, 5] * 30
            + np.random.normal(0, 50, n_samples)
        )

        self.predictor.train(X, y)

    def forecast(self, destination: str, days: int, budget: float) -> dict:
        features = {
            'days': days,
            'destination': destination,
            'destination_popularity': 0.7,
            'season_factor': 1.0,
            'accommodation_level': 2,
            'activity_level': 2,
            'dining_level': 2,
        }

        result = self.predictor.predict(features)

        return {
            'destination': destination,
            'days': days,
            'budget': budget,
            'breakdown': result['breakdown'],
            'confidence': result['confidence'],
            'totalEstimated': result['total_budget'],
        }
