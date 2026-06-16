# Smart-Wanderlust: AI-Driven Personalized Travel Itinerary Builder

## Intelligent AI-Powered Travel Planning Assistant

Smart-Wanderlust is an advanced AI-powered travel planning platform that creates personalized travel itineraries using Large Language Models, recommendation systems, optimization algorithms, and real-time travel intelligence.

---

## Features

### AI-Powered Itinerary Generation
- GPT-4 & Claude based itinerary creation
- Multi-day personalized trip planning
- Natural language travel assistant

### Personalized Recommendations
- Collaborative Filtering
- Matrix Factorization
- Traveler Similarity Analysis
- Destination Ranking Engine

### Real-Time Travel Intelligence
- Flight pricing integration
- Hotel availability tracking
- Weather-aware activity suggestions
- Local events discovery

### Route Optimization
- Traveling Salesman Problem (TSP) Solver
- Distance minimization
- Time-efficient planning
- Multi-city trip optimization

### Budget Forecasting
- Trip cost prediction
- Spending analysis
- Budget recommendations
- Regression-based forecasting

### NLP & Multilingual Support
- Hugging Face Transformers
- spaCy
- NLTK
- Multi-language itinerary generation

---

## Tech Stack

### AI / Machine Learning
- OpenAI GPT-4
- Anthropic Claude
- Scikit-Learn

### NLP
- Hugging Face Transformers
- spaCy
- NLTK

### Recommendation Engine
- Collaborative Filtering
- Matrix Factorization
- Content-Based Filtering
- Hybrid Recommendation Models

### Optimization
- Google OR-Tools
- NetworkX

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- FastAPI

### Database
- PostgreSQL
- MongoDB
- Elasticsearch

### APIs
- Google Maps API
- Booking.com API
- OpenWeather API
- Skyscanner API

### Infrastructure
- Docker
- AWS Lambda
- AWS RDS
- AWS CloudFront

---

## Architecture

```
                ┌─────────────────┐
                │     Next.js     │
                │    Frontend     │
                └────────┬────────┘
                         │
                    REST APIs
                         │
        ┌────────────────┴──────────────┐
        │                               │
 ┌──────▼───────┐             ┌─────────▼────────┐
 │ Node Backend │             │ FastAPI AI Layer │
 └──────┬───────┘             └─────────┬────────┘
        │                               │
        │                    ┌──────────▼──────────┐
        │                    │ Recommendation AI   │
        │                    ├─────────────────────┤
        │                    │ Itinerary Generator │
        │                    ├─────────────────────┤
        │                    │ Route Optimizer     │
        │                    ├─────────────────────┤
        │                    │ Budget Predictor    │
        │                    └──────────┬──────────┘
        │                               │
        └───────────────┬───────────────┘
                        │
        ┌───────────────▼───────────────┐
        │ PostgreSQL | Mongo | Elastic  │
        └───────────────────────────────┘
```

---

## Project Structure

```
smart-wanderlust-ai-trips/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   ├── components/          # React components
│   │   ├── services/            # API client services
│   │   ├── hooks/               # Custom React hooks
│   │   └── types/               # TypeScript type definitions
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── Dockerfile
│
├── backend/                     # Node.js Express backend
│   ├── src/
│   │   ├── routes/              # API route definitions
│   │   ├── controllers/         # Request handlers
│   │   ├── services/            # Business logic
│   │   ├── middleware/          # Express middleware
│   │   └── config/              # Configuration files
│   ├── package.json
│   └── Dockerfile
│
├── ai-services/                 # FastAPI AI microservices
│   ├── app/
│   │   ├── recommendation/      # Recommendation engine
│   │   ├── itinerary/           # Itinerary generation
│   │   ├── optimization/        # Route optimization
│   │   ├── forecasting/         # Budget forecasting
│   │   └── models/              # ML models
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/                    # Database schemas and migrations
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
│
├── infrastructure/              # Deployment and infrastructure
│   ├── docker-compose.yml
│   ├── aws/
│   ├── terraform/
│   └── nginx/
│
├── docs/                        # Documentation
│   ├── architecture.md
│   ├── api-documentation.md
│   └── diagrams/
│
├── .github/
│   └── workflows/               # CI/CD pipelines
│       ├── frontend.yml
│       ├── backend.yml
│       └── deployment.yml
│
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- PostgreSQL 16
- MongoDB
- Elasticsearch 8.14

### Installation

```bash
# Clone the repository
git clone https://github.com/Ratheesh-DP/smart-wanderlust-ai-trips.git
cd smart-wanderlust-ai-trips

# Start all services
docker-compose up -d

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Install AI service dependencies
cd ../ai-services && pip install -r requirements.txt
```

### Environment Variables

Create `.env` files in each service directory:

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_API_URL=http://localhost:8000
```

**backend/.env**
```
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/smart_wanderlust
MONGODB_URI=mongodb://localhost:27017/smart_wanderlust
ELASTICSEARCH_URL=http://localhost:9200
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
JWT_SECRET=your_jwt_secret
```

**ai-services/.env**
```
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
POSTGRES_URL=postgresql://postgres:password@localhost:5432/smart_wanderlust
MONGODB_URI=mongodb://localhost:27017/smart_wanderlust
```

---

## API Endpoints

### Backend (Node.js - Port 5000)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| GET | /api/trips | Get user trips |
| POST | /api/trips | Create new trip |
| GET | /api/trips/:id | Get trip details |
| PUT | /api/trips/:id | Update trip |
| DELETE | /api/trips/:id | Delete trip |

### AI Services (FastAPI - Port 8000)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| POST | /api/recommendations | Get personalized recommendations |
| POST | /api/itinerary/generate | Generate AI itinerary |
| POST | /api/optimize/route | Optimize travel route |
| POST | /api/forecast/budget | Predict trip budget |
| POST | /api/nlp/parse | Parse natural language query |

---

## Database Schema

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    budget INTEGER,
    travel_style VARCHAR(100),
    preferences JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_budget NUMERIC(10,2),
    status VARCHAR(50) DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    activity TEXT NOT NULL,
    location VARCHAR(255),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    estimated_cost NUMERIC(10,2),
    start_time TIME,
    end_time TIME,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination VARCHAR(255) NOT NULL,
    score FLOAT NOT NULL,
    reason TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    trip_id UUID REFERENCES trips(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Expected Impact

| Metric | Value |
|---------|---------|
| User Satisfaction | 95% |
| Monthly Active Users | 50K+ |
| Restaurant Recommendation Accuracy | 85% |
| Planning Time Reduction | 4 Hours → 15 Minutes |

---

## Roadmap

- [ ] User Preference Learning
- [ ] AI Itinerary Generator
- [ ] Collaborative Recommendation Engine
- [ ] Route Optimization Service
- [ ] Real-Time Travel Integrations
- [ ] Budget Forecasting Module
- [ ] Cloud Deployment on AWS

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Ratheesh DP** - [GitHub](https://github.com/Ratheesh-DP)

Project Link: [https://github.com/Ratheesh-DP/smart-wanderlust-ai-trips](https://github.com/Ratheesh-DP/smart-wanderlust-ai-trips)
