# Smart-Wanderlust: AI-Driven Personalized Travel Itinerary Builder

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## The Problem

Planning a trip is overwhelming. Travelers spend **4-6 hours** jumping between Google Flights, TripAdvisor, blogs, and YouTube videos just to build a basic itinerary. The information is scattered, outdated, and not personalized.

**Key pain points:**
- Generic travel guides don't match individual preferences
- No way to optimize routes between attractions
- Budgeting is guesswork with no data-driven predictions
- Existing tools lack AI-powered personalization

---

## My Solution

Smart-Wanderlust is a full-stack AI platform that generates **personalized travel itineraries in under 2 minutes**. It combines LLMs, recommendation algorithms, and optimization solvers to create trip plans tailored to each user's style, budget, and interests.

### What it does:
- **AI Itinerary Generation** -- GPT-4 creates day-by-day plans based on your preferences
- **Smart Recommendations** -- Collaborative filtering suggests destinations based on similar travelers
- **Route Optimization** -- OR-Tools solves the Traveling Salesman Problem for efficient travel
- **Budget Forecasting** -- ML models predict trip costs with category-wise breakdowns
- **Natural Language Input** -- Describe your dream trip in plain English, get a full plan

---

## Screenshots

> *Add your own screenshots here after running the project*

| Landing Page | AI Itinerary Generator | Budget Dashboard |
|:---:|:---:|:---:|
| ![Landing](screenshots/landing.png) | ![Generator](screenshots/generator.png) | ![Budget](screenshots/budget.png) |

| Recommendation Engine | Route Optimizer | Trip Details |
|:---:|:---:|:---:|
| ![Recommendations](screenshots/recommendations.png) | ![Route](screenshots/route.png) | ![Trip](screenshots/trip.png) |

---

## Live Demo

**[Live Application](https://smart-wanderlust.vercel.app)** *(deploy after setup)*

---

## Tech Stack & Why I Chose Each Tool

### Frontend
| Tool | Purpose | Why This? |
|------|---------|-----------|
| **Next.js 14** | React framework with App Router | Server-side rendering, API routes, and optimized builds |
| **TypeScript** | Type safety across the codebase | Catch errors at compile time, better IDE support |
| **Tailwind CSS** | Utility-first styling | Rapid UI development without leaving JSX |

### Backend
| Tool | Purpose | Why This? |
|------|---------|-----------|
| **Node.js + Express** | REST API server | Fast setup, huge ecosystem, great for CRUD operations |
| **FastAPI** | AI microservices | Async Python, automatic OpenAPI docs, perfect for ML endpoints |
| **PostgreSQL** | Primary relational database | ACID compliance, JSONB support for flexible user preferences |
| **MongoDB** | User interaction logs | Schema flexibility for tracking diverse user actions |
| **Elasticsearch** | Destination search | Full-text search with fuzzy matching for destination queries |

### AI/ML
| Tool | Purpose | Why This? |
|------|---------|-----------|
| **OpenAI GPT-4** | Itinerary generation | Best reasoning model for creating detailed travel plans |
| **Scikit-Learn** | Recommendation engine, budget forecasting | Mature ML library with NMF, Random Forest, and clustering |
| **Google OR-Tools** | Route optimization | Industry-standard constraint solver for TSP |
| **NetworkX** | Graph algorithms | Backup TSP solver using Christofides algorithm |
| **Hugging Face Transformers** | NLP processing | Pre-trained models for text understanding |

### Infrastructure
| Tool | Purpose | Why This? |
|------|---------|-----------|
| **Docker + Compose** | Containerization | Consistent environments, one-command startup |
| **Nginx** | Reverse proxy | Load balancing, SSL termination, routing |
| **GitHub Actions** | CI/CD pipelines | Automated testing and deployment on push |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                        │
│                   Next.js + TypeScript                       │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     NGINX REVERSE PROXY                      │
│                    Load Balancer / SSL                        │
└────────┬────────────────────────────────────┬────────────────┘
         │                                    │
         ▼                                    ▼
┌─────────────────────┐            ┌─────────────────────────┐
│   NODE.JS BACKEND   │            │    FASTAPI AI LAYER     │
│   Port 5000         │            │    Port 8000            │
│                     │            │                         │
│  - Auth (JWT)       │            │  - GPT-4 Itinerary Gen  │
│  - Trip CRUD        │            │  - Recommendation Eng.  │
│  - User Management  │            │  - Route Optimizer      │
│  - API Validation   │            │  - Budget Predictor     │
└────────┬────────────┘            └───────────┬─────────────┘
         │                                     │
         └──────────────┬──────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  POSTGRESQL  │ │   MONGODB    │ │ELASTICSEARCH │
│  Users/Trips │ │ Interactions │ │  Full-Text   │
│  Itineraries │ │   Logs       │ │   Search     │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## How I Built This -- Step by Step

### Step 1: Database Design
Designed a normalized PostgreSQL schema with 7 tables handling users, trips, itineraries, recommendations, reviews, interactions, and saved destinations. Used UUIDs for primary keys and JSONB for flexible preference storage.

### Step 2: Backend API (Node.js)
Built a RESTful API with Express handling authentication (JWT), trip CRUD operations, and route protection middleware. Connected to PostgreSQL via connection pooling for performance.

### Step 3: AI Recommendation Engine
Implemented collaborative filtering using Non-negative Matrix Factorization (NMF) from Scikit-Learn. The engine builds a user-destination interaction matrix and learns latent factors to predict preferences.

```python
# Core recommendation logic
model = NMF(n_components=5, init='random', random_state=42)
W = model.fit_transform(user_item_matrix)  # User features
H = model.components_                       # Item features
predictions = W @ H                         # Reconstruct ratings
```

### Step 4: GPT-4 Itinerary Generator
Created a prompt engineering pipeline that structures user preferences into detailed system prompts. GPT-4 returns JSON-formatted itineraries with activities, timings, costs, and locations.

### Step 5: Route Optimization
Implemented the Traveling Salesman Problem solver using Google OR-Tools. Built a haversine distance calculator for real-world geographic distances between attractions.

```python
# TSP Solver with OR-Tools
manager = pywrapcp.RoutingIndexManager(num_locations, 1, 0)
routing = pywrapcp.RoutingModel(manager)
routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
solution = routing.SolveWithParameters(search_parameters)
```

### Step 6: Budget Forecasting
Trained a Random Forest Regressor on synthetic travel cost data. The model predicts total budget and provides category-wise breakdown (accommodation, food, transport, activities).

### Step 7: Frontend (Next.js)
Built the UI with Next.js App Router, TypeScript for type safety, and Tailwind CSS for rapid styling. Created custom React hooks (`useTrips`, `useItinerary`) for state management.

### Step 8: Containerization
Dockerized all three services (frontend, backend, AI) with a Docker Compose orchestration file. Added Nginx as a reverse proxy for routing requests to the correct service.

### Step 9: CI/CD
Set up GitHub Actions workflows for automated linting, type checking, building, and testing on every push to `main`.

---

## What I Learned

### Technical Skills
- **LLM Integration** -- Learned to structure prompts for GPT-4 to return parseable JSON, handling edge cases where the model returns malformed responses
- **Recommendation Systems** -- Understood how matrix factorization decomposes user-item interactions into latent features
- **Constraint Optimization** -- Applied OR-Tools to solve TSP, learning about first solution strategies and local search metaheuristics
- **Microservices Architecture** -- Designed independent services communicating via REST, each with its own database
- **Docker Orchestration** -- Managed multi-container setups with networking, volumes, and environment variables

### Software Engineering
- **API Design** -- Created consistent REST endpoints with proper status codes, validation, and error handling
- **Type Safety** -- Used TypeScript interfaces across frontend and backend for contract-first development
- **Database Optimization** -- Added indexes on frequently queried columns, used connection pooling
- **Security** -- Implemented JWT authentication, bcrypt password hashing, rate limiting, and CORS policies

### Problem-Solving
- Started with a monolithic architecture, then refactored into microservices as the AI layer grew complex
- Faced GPT-4 response parsing issues -- solved with regex extraction and fallback handlers
- NMF recommendation engine needed cold-start handling -- added popularity-based fallback for new users

---

## Project Structure

```
smart-wanderlust-ai-trips/
├── frontend/                 # Next.js 14 + TypeScript
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API client layer
│   │   └── types/            # TypeScript interfaces
│   └── Dockerfile
│
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── middleware/        # Auth, validation
│   │   └── config/           # DB connections
│   └── Dockerfile
│
├── ai-services/              # FastAPI + Python
│   ├── app/
│   │   ├── recommendation/   # Collaborative filtering
│   │   ├── itinerary/        # GPT-4 generator
│   │   ├── optimization/     # OR-Tools TSP
│   │   └── forecasting/      # Budget ML model
│   └── Dockerfile
│
├── database/                 # SQL schemas + seed data
├── infrastructure/           # Docker Compose + Nginx
└── .github/workflows/        # CI/CD pipelines
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- OpenAI API key

### Quick Start

```bash
# Clone the repo
git clone https://github.com/Ratheesh-DP/smart-wanderlust-ai-trips.git
cd smart-wanderlust-ai-trips

# Add your API key
echo "OPENAI_API_KEY=sk-your-key-here" > .env

# Start everything
docker-compose -f infrastructure/docker-compose.yml up -d

# Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# AI Services: http://localhost:8000/docs
```

### Manual Setup (without Docker)

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev

# AI Services
cd ai-services && pip install -r requirements.txt && uvicorn app.main:app --reload
```

---

## API Reference

### Backend Endpoints (Port 5000)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Get JWT token |
| GET | `/api/trips` | List user trips |
| POST | `/api/trips` | Create new trip |
| GET | `/api/trips/:id` | Get trip + itineraries |
| PUT | `/api/trips/:id` | Update trip |
| DELETE | `/api/trips/:id` | Delete trip |

### AI Service Endpoints (Port 8000)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommendations` | Get personalized destinations |
| POST | `/api/itinerary/generate` | Generate AI itinerary |
| POST | `/api/optimize/route` | Optimize travel route (TSP) |
| POST | `/api/forecast/budget` | Predict trip cost |

---

## Future Improvements

- [ ] Real-time flight/hotel price integration via Skyscanner API
- [ ] Google Maps embed for visual route display
- [ ] User preference learning from trip history
- [ ] Multi-language itinerary generation
- [ ] Mobile app with React Native
- [ ] AWS deployment with Lambda + RDS

---

## Contact

**Ratheesh DP**
- GitHub: [https://github.com/Ratheesh-DP](https://github.com/Ratheesh-DP)
- LinkedIn: [Add your LinkedIn](https://linkedin.com/in/your-profile)
- Email: [Add your email]

---

## License

MIT License -- feel free to use this project for learning or as a reference for your own work.
