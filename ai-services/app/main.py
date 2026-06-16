from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.recommendation.router import router as recommendation_router
from app.itinerary.router import router as itinerary_router
from app.optimization.router import router as optimization_router
from app.forecasting.router import router as forecasting_router

load_dotenv()

app = FastAPI(
    title="Smart-Wanderlust AI Services",
    description="AI-powered travel planning microservices",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendation_router, prefix="/api/recommendations", tags=["recommendations"])
app.include_router(itinerary_router, prefix="/api/itinerary", tags=["itinerary"])
app.include_router(optimization_router, prefix="/api/optimize", tags=["optimization"])
app.include_router(forecasting_router, prefix="/api/forecast", tags=["forecasting"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-services"}

@app.get("/")
async def root():
    return {
        "service": "Smart-Wanderlust AI Services",
        "version": "1.0.0",
        "endpoints": {
            "recommendations": "/api/recommendations",
            "itinerary": "/api/itinerary",
            "optimization": "/api/optimize",
            "forecasting": "/api/forecast",
        },
    }
