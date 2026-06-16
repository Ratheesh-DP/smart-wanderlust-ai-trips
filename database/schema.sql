CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    budget INTEGER DEFAULT 0,
    travel_style VARCHAR(100) DEFAULT 'balanced',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_budget NUMERIC(10,2) DEFAULT 0,
    spent NUMERIC(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planning',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    activity TEXT NOT NULL,
    description TEXT,
    location VARCHAR(255),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    address TEXT,
    estimated_cost NUMERIC(10,2) DEFAULT 0,
    actual_cost NUMERIC(10,2) DEFAULT 0,
    start_time TIME,
    end_time TIME,
    category VARCHAR(100),
    priority INTEGER DEFAULT 0,
    is_booked BOOLEAN DEFAULT FALSE,
    booking_reference VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination VARCHAR(255) NOT NULL,
    score FLOAT NOT NULL CHECK (score >= 0 AND score <= 1),
    reason TEXT,
    category VARCHAR(100),
    metadata JSONB DEFAULT '{}',
    is_viewed BOOLEAN DEFAULT FALSE,
    is_dismissed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    itinerary_id UUID REFERENCES itineraries(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    pros TEXT,
    cons TEXT,
    visit_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination VARCHAR(255),
    action_type VARCHAR(50) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE saved_destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_trips_destination ON trips(destination);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);
CREATE INDEX idx_itineraries_trip_id ON itineraries(trip_id);
CREATE INDEX idx_itineraries_day ON itineraries(trip_id, day_number);
CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX idx_recommendations_score ON recommendations(score DESC);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_trip_id ON reviews(trip_id);
CREATE INDEX idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_destination ON user_interactions(destination);
CREATE INDEX idx_saved_destinations_user_id ON saved_destinations(user_id);
