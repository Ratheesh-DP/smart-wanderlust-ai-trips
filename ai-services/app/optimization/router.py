from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class LocationModel(BaseModel):
    name: str
    latitude: float
    longitude: float
    duration: Optional[int] = 60


class OptimizeRequest(BaseModel):
    locations: list[LocationModel]
    startDate: str
    endDate: str
    startLocation: Optional[LocationModel] = None


class OptimizeResponse(BaseModel):
    optimizedOrder: list[int]
    totalDistance: float
    locations: list[dict]


@router.post("/route", response_model=OptimizeResponse)
async def optimize_route(request: OptimizeRequest):
    try:
        from app.optimization.route_optimizer import RouteOptimizer

        optimizer = RouteOptimizer()
        locations = [loc.model_dump() for loc in request.locations]

        result = optimizer.optimize_tsp(locations)

        return OptimizeResponse(
            optimizedOrder=result["optimizedOrder"],
            totalDistance=result["totalDistance"],
            locations=result["locations"],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
