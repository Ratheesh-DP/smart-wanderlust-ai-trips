from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class RecommendationRequest(BaseModel):
    userId: str
    interests: list[str] = []
    budget: Optional[float] = None
    travelStyle: Optional[str] = None
    n: int = 10


class RecommendationResponse(BaseModel):
    destination: str
    score: float
    reason: Optional[str] = None
    category: Optional[str] = None


@router.post("/", response_model=list[RecommendationResponse])
async def get_recommendations(request: RecommendationRequest):
    try:
        from app.recommendation.engine import RecommendationEngine
        engine = RecommendationEngine()
        recommendations = engine.get_recommendations(request.userId, request.n)

        return [
            RecommendationResponse(
                destination=rec['destination'],
                score=rec['score'],
                reason=f"Based on your travel preferences",
                category="personalized",
            )
            for rec in recommendations
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{destination}")
async def get_destination_info(destination: str):
    try:
        return {
            "destination": destination,
            "popular_times": [],
            "average_budget": 0,
            "top_activities": [],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
