from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class ItineraryRequest(BaseModel):
    destination: str
    startDate: str
    endDate: str
    budget: float
    interests: list[str] = []
    pace: str = "moderate"
    specialRequests: Optional[str] = ""


class ItineraryResponse(BaseModel):
    trip: dict
    itinerary: list[dict]
    totalEstimatedCost: float


@router.post("/generate", response_model=ItineraryResponse)
async def generate_itinerary(request: ItineraryRequest):
    try:
        from app.itinerary.generator import ItineraryGenerator

        generator = ItineraryGenerator()
        result = generator.generate(
            destination=request.destination,
            start_date=request.startDate,
            end_date=request.endDate,
            budget=request.budget,
            interests=request.interests,
            pace=request.pace,
            special_requests=request.specialRequests or "",
        )

        itinerary = []
        total_cost = 0
        for day in result.get("days", []):
            for activity in day.get("activities", []):
                cost = activity.get("estimated_cost", 0)
                total_cost += cost
                itinerary.append({
                    "day_number": day["day_number"],
                    "activity": activity["activity"],
                    "location": activity.get("location", ""),
                    "estimated_cost": cost,
                    "start_time": activity.get("time", ""),
                    "category": activity.get("category", "other"),
                })

        return ItineraryResponse(
            trip={
                "destination": request.destination,
                "startDate": request.startDate,
                "endDate": request.endDate,
                "totalBudget": request.budget,
            },
            itinerary=itinerary,
            totalEstimatedCost=total_cost,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/parse")
async def parse_natural_language(query: dict):
    try:
        from openai import OpenAI
        import os

        client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "Parse travel requests from natural language. Extract: destination, dates, budget, interests, pace. Return JSON.",
                },
                {"role": "user", "content": query.get("query", "")},
            ],
            temperature=0.3,
            max_tokens=500,
        )

        import json
        text = response.choices[0].message.content
        start = text.find('{')
        end = text.rfind('}') + 1
        if start != -1 and end != -1:
            return json.loads(text[start:end])
        return {"raw": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
