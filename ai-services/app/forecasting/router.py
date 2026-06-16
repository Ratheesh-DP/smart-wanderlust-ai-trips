from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class ForecastRequest(BaseModel):
    destination: str
    days: int
    budget: float


class BudgetBreakdown(BaseModel):
    accommodation: float
    food: float
    transportation: float
    activities: float
    shopping: float
    miscellaneous: float


class ForecastResponse(BaseModel):
    destination: str
    days: int
    budget: float
    breakdown: BudgetBreakdown
    confidence: float


@router.post("/budget", response_model=ForecastResponse)
async def forecast_budget(request: ForecastRequest):
    try:
        from app.forecasting.budget_predictor import BudgetForecaster

        forecaster = BudgetForecaster()
        result = forecaster.forecast(
            destination=request.destination,
            days=request.days,
            budget=request.budget,
        )

        return ForecastResponse(
            destination=result['destination'],
            days=result['days'],
            budget=result['budget'],
            breakdown=BudgetBreakdown(**result['breakdown']),
            confidence=result['confidence'],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
